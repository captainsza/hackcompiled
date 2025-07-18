import Image from "next/image";

import Link from "next/link";

const LINKS = [
  {
    title: "Docs",
    href: "https://turborepo.com/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turborepo.com/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turborepo.com/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Code<span className="text-blue-600">Judge</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Practice coding problems, improve your programming skills, and prepare
          for technical interviews with our online judge platform supporting C,
          Python, JavaScript, and Java.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              🏆 Competitive Programming
            </h3>
            <p className="text-gray-600">
              Solve algorithmic challenges and compete with other programmers
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              💻 Multi-Language Support
            </h3>
            <p className="text-gray-600">
              Code in C, Python, JavaScript, or Java with real-time execution
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              📊 Detailed Feedback
            </h3>
            <p className="text-gray-600">
              Get instant feedback on your solutions with test case results
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              🎯 Skill Building
            </h3>
            <p className="text-gray-600">
              Practice problems ranging from easy to hard difficulty levels
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/problems"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Solving Problems
          </Link>

          <Link
            href="/leaderboard"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            View Leaderboard
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Problems</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">4</div>
            <div className="text-gray-600">Languages</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">1000+</div>
            <div className="text-gray-600">Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">24/7</div>
            <div className="text-gray-600">Available</div>
          </div>
        </div>
      </div>
    </main>
  );
}
