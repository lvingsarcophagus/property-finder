"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"

export default function ConnectionTest() {
  const [status, setStatus] = useState("Testing...")
  const [error, setError] = useState("")

  const testConnection = async () => {
    setStatus("Testing connection...")
    setError("")
    
    try {
      // Test environment variables
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!url || !key) {
        setError(`Missing env vars: URL=${!!url}, KEY=${!!key}`)
        setStatus("Failed - Environment variables missing")
        return
      }
      
      // Test Supabase connection
      const supabase = createBrowserClient()
      
      // Try to get session (this should work even without auth)
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        setError(`Supabase error: ${error.message}`)
        setStatus("Failed - Supabase connection error")
        return
      }
      
      setStatus("✅ Connection successful")
      
    } catch (err: any) {
      setError(`Unexpected error: ${err.message}`)
      setStatus("Failed - Unexpected error")
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Connection Test</h1>
        <div className="space-y-4">
          <div>
            <strong>Status:</strong> {status}
          </div>
          {error && (
            <div className="text-red-600">
              <strong>Error:</strong> {error}
            </div>
          )}
          <Button onClick={testConnection} className="w-full">
            Test Again
          </Button>
          <div className="text-sm text-gray-600">
            <p>Environment Check:</p>
            <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
            <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
