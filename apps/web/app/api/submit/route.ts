import { PrismaClient } from 'database'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Judge0 language mappings
const LANGUAGE_MAP = {
  'C': 50,           // C (GCC 9.2.0)
  'PYTHON': 71,      // Python (3.8.1)
  'JAVASCRIPT': 63,  // JavaScript (Node.js 12.14.0)
  'JAVA': 62         // Java (OpenJDK 13.0.1)
}

// Mock Judge0 execution for demo
async function mockJudge0Execution(code: string, languageId: number, input?: string) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock success rate of 70%
  const isSuccess = Math.random() > 0.3
  
  return {
    stdout: isSuccess ? "Expected output" : "Wrong output",
    stderr: null,
    status: {
      id: isSuccess ? 3 : 4, // 3 = Accepted, 4 = Wrong Answer
      description: isSuccess ? "Accepted" : "Wrong Answer"
    },
    time: "0.01",
    memory: 1024
  }
}

export async function POST(request: Request) {
  try {
    const { problemId, language, code, userId } = await request.json()

    // Ensure demo user exists
    let demoUserId = userId || 'demo-user-id'
    
    if (!userId) {
      const demoUser = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
          email: 'demo@example.com',
          username: 'demo_user',
          name: 'Demo User'
        }
      })
      demoUserId = demoUser.id
    }

    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId: demoUserId,
        problemId,
        language,
        code,
        status: 'PENDING'
      }
    })

    // Get problem test cases
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: { testCases: true }
    })

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }

    // Get Judge0 language ID
    const languageId = LANGUAGE_MAP[language as keyof typeof LANGUAGE_MAP]
    if (!languageId) {
      return NextResponse.json({ error: 'Language not supported' }, { status: 400 })
    }

    try {
      // Execute code with mock Judge0
      let allPassed = true
      let totalRuntime = 0
      let maxMemory = 0

      // Test against first few test cases (limit for demo)
      const testCasesToRun = problem.testCases.slice(0, 3)
      
      for (const testCase of testCasesToRun) {
        const result = await mockJudge0Execution(code, languageId, testCase.input)
        
        if (result.status.id !== 3) { // Not accepted
          allPassed = false
          break
        }
        
        totalRuntime += parseFloat(result.time || '0')
        maxMemory = Math.max(maxMemory, result.memory || 0)
      }

      const finalStatus = allPassed ? 'ACCEPTED' : 'WRONG_ANSWER'
      const avgRuntime = Math.round(totalRuntime / testCasesToRun.length * 1000) // Convert to ms

      // Update submission with result
      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          status: finalStatus,
          runtime: avgRuntime,
          memory: Math.round(maxMemory / 1024) // Convert to MB
        }
      })

      return NextResponse.json({ 
        submissionId: submission.id,
        status: finalStatus,
        runtime: avgRuntime,
        memory: Math.round(maxMemory / 1024),
        testsPassed: allPassed ? testCasesToRun.length : 0,
        totalTests: problem.testCases.length
      })

    } catch (error) {
      // Update submission with error status
      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          status: 'RUNTIME_ERROR'
        }
      })

      return NextResponse.json({ 
        submissionId: submission.id,
        status: 'RUNTIME_ERROR',
        error: 'Code execution failed'
      })
    }

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
