'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Problem {
  id: string
  title: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  _count: { submissions: number }
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    fetchProblems()
  }, [])

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems')
      if (response.ok) {
        const data = await response.json()
        setProblems(data)
      }
    } catch (error) {
      console.error('Error fetching problems:', error)
    } finally {
      setLoading(false)
    }
  }

  const seedDatabase = async () => {
    setSeeding(true)
    try {
      const response = await fetch('/api/seed', { method: 'POST' })
      if (response.ok) {
        await fetchProblems()
      }
    } catch (error) {
      console.error('Error seeding database:', error)
    } finally {
      setSeeding(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY': return 'text-green-600 bg-green-100'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100'
      case 'HARD': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading problems...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Coding Problems</h1>
          
          {problems.length === 0 && (
            <button
              onClick={seedDatabase}
              disabled={seeding}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {seeding ? 'Loading Demo Problems...' : 'Load Demo Problems'}
            </button>
          )}
        </div>

        {problems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No Problems Found</h2>
            <p className="text-gray-600 mb-6">
              Click the button above to load demo problems including Two Sum, Valid Parentheses, and Fibonacci!
            </p>
            <div className="text-sm text-gray-500">
              <p>Demo problems include support for:</p>
              <ul className="mt-2 space-y-1">
                <li>• C (GCC 9.2.0)</li>
                <li>• Python (3.8.1)</li>
                <li>• JavaScript (Node.js 12.14.0)</li>
                <li>• Java (OpenJDK 13.0.1)</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Problem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submissions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {problems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/problems/${problem.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {problem._count.submissions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
