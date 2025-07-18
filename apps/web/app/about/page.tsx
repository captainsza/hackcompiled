export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About CodeJudge</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              CodeJudge is a modern online coding platform that integrates with Judge0 to provide 
              a robust code execution environment. Practice algorithms, data structures, and 
              programming concepts with instant feedback.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Support for multiple programming languages (C, Python, JavaScript, Java)</li>
              <li>Real-time code execution and testing</li>
              <li>Comprehensive problem set with varying difficulty levels</li>
              <li>Detailed feedback and performance metrics</li>
              <li>Judge0 integration for secure sandboxed execution</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Powered by Judge0</h2>
            <p className="text-gray-700 mb-4">
              Our platform leverages Judge0, a robust and scalable online code execution system. 
              Judge0 provides:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Secure sandboxed compilation and execution</li>
              <li>Support for over 60 programming languages</li>
              <li>Custom time and memory limits</li>
              <li>Detailed execution results and error reporting</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Language Support</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold">C</h3>
                <p className="text-sm text-gray-600">GCC 9.2.0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold">Python</h3>
                <p className="text-sm text-gray-600">3.8.1</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold">JavaScript</h3>
                <p className="text-sm text-gray-600">Node.js 12.14.0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold">Java</h3>
                <p className="text-sm text-gray-600">OpenJDK 13.0.1</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-700 mb-4">
              Ready to start coding? Visit our problems page to browse challenges and begin solving!
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="/problems" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Coding
              </a>
              <a 
                href="https://judge0.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Learn About Judge0
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
