import { NextResponse } from 'next/server'
import { PrismaClient } from 'database'

const prisma = new PrismaClient()

// Demo problems data
const demoProblems = [
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Constraints:
• 2 <= nums.length <= 10^4
• -10^9 <= nums[i] <= 10^9
• -10^9 <= target <= 10^9`,
    difficulty: 'EASY' as const,
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", output: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", output: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", output: "[0,1]", isHidden: true }
    ]
  },
  {
    title: "Valid Parentheses", 
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

Constraints:
• 1 <= s.length <= 10^4
• s consists of parentheses only '()[]{}'.`,
    difficulty: 'MEDIUM' as const,
    constraints: ["1 <= s.length <= 10^4"],
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    testCases: [
      { input: "()", output: "true", isHidden: false },
      { input: "()[]{}", output: "true", isHidden: false },
      { input: "(]", output: "false", isHidden: false }
    ]
  },
  {
    title: "Fibonacci Number",
    description: `The Fibonacci numbers form a sequence where each number is the sum of the two preceding ones, starting from 0 and 1.

Given n, calculate F(n).

Constraints:
• 0 <= n <= 30`,
    difficulty: 'EASY' as const,
    constraints: ["0 <= n <= 30"],
    examples: [
      { input: "n = 2", output: "1" },
      { input: "n = 3", output: "2" },
      { input: "n = 4", output: "3" }
    ],
    testCases: [
      { input: "2", output: "1", isHidden: false },
      { input: "3", output: "2", isHidden: false },
      { input: "4", output: "3", isHidden: false },
      { input: "0", output: "0", isHidden: true },
      { input: "1", output: "1", isHidden: true }
    ]
  }
]

export async function POST() {
  try {
    // Create demo user
    const user = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {},
      create: {
        email: 'demo@example.com',
        username: 'demo_user',
        name: 'Demo User'
      }
    })

    // Create demo problems
    for (const problemData of demoProblems) {
      const { testCases, ...problem } = problemData
      
      // Check if problem already exists
      const existingProblem = await prisma.problem.findFirst({
        where: { title: problem.title }
      })
      
      let createdProblem
      if (existingProblem) {
        // Update existing problem
        createdProblem = await prisma.problem.update({
          where: { id: existingProblem.id },
          data: problem
        })
      } else {
        // Create new problem
        createdProblem = await prisma.problem.create({
          data: problem
        })
      }

      // Delete existing test cases and create new ones
      await prisma.testCase.deleteMany({
        where: { problemId: createdProblem.id }
      })

      await prisma.testCase.createMany({
        data: testCases.map(tc => ({
          ...tc,
          problemId: createdProblem.id
        }))
      })
    }
    
    return NextResponse.json({ 
      message: 'Database seeded successfully with demo problems',
      count: demoProblems.length
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ 
      error: 'Failed to seed database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
