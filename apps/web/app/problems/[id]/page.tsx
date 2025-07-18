'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface Problem {
  id: string
  title: string
  description: string
  difficulty: string
  examples: Array<{ input: string; output: string }>
  testCases: Array<{ input: string; output: string }>
}

const languages = [
  { id: 'C', name: 'C', template: '#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}' },
  { id: 'PYTHON', name: 'Python', template: '# Your code here\ndef solution():\n    pass\n' },
  { id: 'JAVASCRIPT', name: 'JavaScript', template: '// Your code here\nfunction solution() {\n    \n}\n' },
  { id: 'JAVA', name: 'Java', template: 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}' }
]

export default function ProblemPage() {
  const params = useParams()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('PYTHON')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/problems/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setProblem(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching problem:', error)
          setLoading(false)
        })
    }
  }, [params.id])

  useEffect(() => {
    const template = languages.find(lang => lang.id === selectedLanguage)?.template || ''
    setCode(template)
  }, [selectedLanguage])

  const handleSubmit = async () => {
    if (!code.trim()) return

    setSubmitting(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem?.id,
          language: selectedLanguage,
          code,
          userId: 'demo-user'
        })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Submission error:', error)
      setResult({ status: 'ERROR', error: 'Submission failed' })
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return 'text-green-600 bg-green-100'
      case 'WRONG_ANSWER': return 'text-red-600 bg-red-100'
      case 'RUNTIME_ERROR': return 'text-red-600 bg-red-100'
      case 'TIME_LIMIT_EXCEEDED': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading problem...</div>
      </div>
    )
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Problem not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h1>
            
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                problem.difficulty === 'EASY' ? 'text-green-600 bg-green-100' :
                problem.difficulty === 'MEDIUM' ? 'text-yellow-600 bg-yellow-100' :
                'text-red-600 bg-red-100'
              }`}>
                {problem.difficulty}
              </span>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
            </div>

            {problem.examples && problem.examples.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Examples</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-2">
                      <strong>Input:</strong>
                      <pre className="mt-1 p-2 bg-white rounded border text-sm overflow-x-auto">{example.input}</pre>
                    </div>
                    <div>
                      <strong>Output:</strong>
                      <pre className="mt-1 p-2 bg-white rounded border text-sm overflow-x-auto">{example.output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {problem.testCases && problem.testCases.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Sample Test Cases</h3>
                {problem.testCases.map((testCase, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-2">
                      <strong>Input:</strong>
                      <pre className="mt-1 p-2 bg-white rounded border text-sm overflow-x-auto">{testCase.input}</pre>
                    </div>
                    <div>
                      <strong>Expected Output:</strong>
                      <pre className="mt-1 p-2 bg-white rounded border text-sm overflow-x-auto">{testCase.output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
              
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Running Code...' : 'Submit & Run'}
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {result && (
              <div className="mt-4 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold px-2 py-1 rounded-full text-sm ${getStatusColor(result.status)}`}>
                    {result.status.replace('_', ' ')}
                  </span>
                  {result.runtime && (
                    <span className="text-sm text-gray-600">
                      Runtime: {result.runtime}ms | Memory: {result.memory}MB
                    </span>
                  )}
                </div>
                
                {result.testsPassed !== undefined && (
                  <div className="text-sm text-gray-600">
                    Test Cases: {result.testsPassed}/{result.totalTests} passed
                  </div>
                )}
                
                {result.error && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {result.error}
                  </div>
                )}

                <div className="mt-2 text-xs text-gray-500">
                  Mock execution for demo - Ready for Judge0 integration
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
