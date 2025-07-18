import { prisma } from 'database'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { problemId, language, code, userId } = await request.json()

    // Create submission record
    const submission = await prisma.submission.create({
      data: {
        userId,
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

    // Mock execution logic (replace with actual code execution)
    const result = await executeCode(code, language, problem.testCases)

    // Update submission with result
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: result.status,
        runtime: result.runtime,
        memory: result.memory
      }
    })

    return NextResponse.json({ 
      submissionId: submission.id,
      status: result.status,
      runtime: result.runtime,
      memory: result.memory
    })

  } catch (error) {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}

// Mock code execution function
async function executeCode(code: string, language: string, testCases: any[]) {
  // This is a mock implementation
  // In a real application, you would use Docker containers or sandboxed environments
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate execution time
  
  const isCorrect = Math.random() > 0.3 // Mock 70% success rate
  
  return {
    status: isCorrect ? 'ACCEPTED' : 'WRONG_ANSWER',
    runtime: Math.floor(Math.random() * 100) + 10,
    memory: Math.floor(Math.random() * 50) + 20
  }
}
