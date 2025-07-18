
import { PrismaClient } from 'database'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: params.id },
      include: {
        testCases: {
          where: { isHidden: false },
          select: {
            input: true,
            output: true
          }
        }
      }
    })

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }

    return NextResponse.json(problem)
  } catch (error) {
    console.error('Error fetching problem:', error)
    return NextResponse.json({ error: 'Failed to fetch problem' }, { status: 500 })
  }
}
