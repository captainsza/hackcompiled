
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

// Create local prisma instance
const prisma = new PrismaClient()

export async function GET() {
  try {
    const problems = await prisma.problem.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        _count: {
          select: {
            submissions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(problems)
  } catch (error) {
    console.error('Error fetching problems:', error)
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 })
  }
}
