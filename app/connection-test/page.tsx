"use client"

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase-client'

export default function ConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...')
        
        const supabase = createSupabaseClient()
        
        // Test basic connection
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        
        if (error) {
          console.error('Supabase error:', error)
          setError(`Supabase Error: ${error.message}`)
          setConnectionStatus('Failed')
        } else {
          console.log('Supabase connection successful:', data)
          setConnectionStatus('Success')
        }
      } catch (err) {
        console.error('Connection test error:', err)
        setError(`Connection Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setConnectionStatus('Failed')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div className="space-y-4">
        <p><strong>Status:</strong> {connectionStatus}</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold">Environment Variables:</h3>
          <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
          <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'}</p>
        </div>
      </div>
    </div>
  )
}
