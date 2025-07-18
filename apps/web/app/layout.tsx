import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeCompiled - Online Coding Platform",
  description: "Practice coding problems with Judge0 integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-900">
                    Hack<span className="text-blue-600">Compiled</span>
                  </span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/problems"
                    className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  >
                    Problems
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  >
                    Leaderboard
                  </Link>
                 
                </div>
              </div>
          
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
