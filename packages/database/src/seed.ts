import { PrismaClient } from 'database'

const prisma = new PrismaClient()

const demoProblems = [
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Constraints:
• 2 <= nums.length <= 10^4
• -10^9 <= nums[i] <= 10^9
• -10^9 <= target <= 10^9
• Only one valid answer exists.`,
    difficulty: 'EASY' as const,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9", 
      "-10^9 <= target <= 10^9"
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]"
      },
      {
        input: "nums = [3,2,4], target = 6", 
        output: "[1,2]"
      }
    ],
    testCases: [
      { input: "[2,7,11,15]\n9", output: "[0,1]", isHidden: false },
      { input: "[3,2,4]\n6", output: "[1,2]", isHidden: false },
      { input: "[3,3]\n6", output: "[0,1]", isHidden: true },
      { input: "[1,2,3,4,5]\n8", output: "[2,4]", isHidden: true }
    ]
  },
  {
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Constraints:
• 1 <= s.length <= 10^5
• s[i] is a printable ascii character.`,
    difficulty: 'EASY' as const,
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character"
    ],
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    testCases: [
      { input: "hello", output: "olleh", isHidden: false },
      { input: "Hannah", output: "hannaH", isHidden: false },
      { input: "a", output: "a", isHidden: true },
      { input: "ab", output: "ba", isHidden: true }
    ]
  },
  {
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Constraints:
• 1 <= s.length <= 10^4
• s consists of parentheses only '()[]{}'.`,
    difficulty: 'MEDIUM' as const,
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    testCases: [
      { input: "()", output: "true", isHidden: false },
      { input: "()[]{}", output: "true", isHidden: false },
      { input: "(]", output: "false", isHidden: false },
      { input: "([)]", output: "false", isHidden: true },
      { input: "{[]}", output: "true", isHidden: true }
    ]
  },
  {
    title: "Maximum Subarray",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.

Constraints:
• 1 <= nums.length <= 10^5
• -10^4 <= nums[i] <= 10^4`,
    difficulty: 'MEDIUM' as const,
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6"
      },
      {
        input: "nums = [1]",
        output: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23"
      }
    ],
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6", isHidden: false },
      { input: "[1]", output: "1", isHidden: false },
      { input: "[5,4,-1,7,8]", output: "23", isHidden: false },
      { input: "[-1]", output: "-1", isHidden: true },
      { input: "[-2,-1]", output: "-1", isHidden: true }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Constraints:
• The number of nodes in both lists is in the range [0, 50].
• -100 <= Node.val <= 100
• Both list1 and list2 are sorted in non-decreasing order.`,
    difficulty: 'EASY' as const,
    constraints: [
      "The number of nodes in both lists is in the range [0, 50]",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order"
    ],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]"
      }
    ],
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]", isHidden: false },
      { input: "[]\n[]", output: "[]", isHidden: false },
      { input: "[]\n[0]", output: "[0]", isHidden: false },
      { input: "[1]\n[2]", output: "[1,2]", isHidden: true },
      { input: "[2]\n[1]", output: "[1,2]", isHidden: true }
    ]
  }
]

async function main() {
  console.log('Start seeding...')
  
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

    console.log(`Created problem: ${problem.title}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
