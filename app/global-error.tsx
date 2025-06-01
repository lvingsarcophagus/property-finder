"use client"

import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 via-white to-green-50`}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Critical Error</h1>
              <p className="text-gray-600 mb-6">A critical error has occurred. We apologize for the inconvenience.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => reset()} className="bg-blue-600 hover:bg-blue-700">
                  Try again
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Go to homepage</Link>
                </Button>
              </div>
            </div>
            {error.digest && <p className="text-xs text-gray-500">Error ID: {error.digest}</p>}
          </div>
        </div>
      </body>
    </html>
  )
}
