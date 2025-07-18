import { prisma } from 'database'
import { NextResponse } from 'next/server'

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
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 })
  }
}
