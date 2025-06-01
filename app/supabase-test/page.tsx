"use client"

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase-client'

export default function SupabaseTestPage() {
  const [testResults, setTestResults] = useState<{
    clientCreation: string
    connection: string
    authSession: string
    error?: string
  }>({
    clientCreation: 'Pending...',
    connection: 'Pending...',
    authSession: 'Pending...'
  })

  useEffect(() => {
    async function runTests() {
      try {
        // Test 1: Client Creation
        console.log('Testing Supabase client creation...')
        const supabase = createBrowserClient()
        setTestResults(prev => ({ ...prev, clientCreation: 'Success ✅' }))

        // Test 2: Basic Connection
        console.log('Testing Supabase connection...')
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        if (error) {
          console.warn('Connection test error (might be expected):', error)
          setTestResults(prev => ({ ...prev, connection: `Warning: ${error.message} ⚠️` }))
        } else {
          setTestResults(prev => ({ ...prev, connection: 'Success ✅' }))
        }

        // Test 3: Auth Session
        console.log('Testing auth session...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) {
          console.error('Session test error:', sessionError)
          setTestResults(prev => ({ ...prev, authSession: `Error: ${sessionError.message} ❌` }))
        } else {
          const sessionStatus = session ? 'Active Session ✅' : 'No Active Session (Expected) ✅'
          setTestResults(prev => ({ ...prev, authSession: sessionStatus }))
        }

      } catch (error: any) {
        console.error('Test error:', error)
        setTestResults(prev => ({ ...prev, error: error.message }))
      }
    }

    runTests()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Client Creation:</span>
              <span className="text-sm">{testResults.clientCreation}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Database Connection:</span>
              <span className="text-sm">{testResults.connection}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Auth Session:</span>
              <span className="text-sm">{testResults.authSession}</span>
            </div>
          </div>
          
          {testResults.error && (
            <div className="mt-6 p-4 rounded bg-red-50 border border-red-200">
              <h3 className="font-medium text-red-800 mb-2">Error</h3>
              <p className="text-red-600 text-sm">{testResults.error}</p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Supabase URL:</span> 
              <span className="text-sm ml-2">{process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configured' : '❌ Missing'}</span>
            </div>
            <div>
              <span className="font-medium">Supabase Key:</span> 
              <span className="text-sm ml-2">{process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
