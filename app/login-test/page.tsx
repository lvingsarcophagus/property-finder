"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { createBrowserClient } from '@/lib/supabase-client'

export default function LoginTestPage() {
  const { login, isLoading, isAuthenticated, user } = useAuth()
  const [testCredentials, setTestCredentials] = useState({
    email: 'test@example.com',
    password: 'testpassword123'
  })
  const [loginResult, setLoginResult] = useState<string>('')
  const [authLogs, setAuthLogs] = useState<string[]>([])
  const [isTestingLogin, setIsTestingLogin] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setAuthLogs(prev => [...prev, `${timestamp}: ${message}`])
  }

  useEffect(() => {
    addLog(`Auth loading state: ${isLoading}`)
    addLog(`Auth authenticated state: ${isAuthenticated}`)
    addLog(`User exists: ${!!user}`)
  }, [isLoading, isAuthenticated, user])

  const testSupabaseConnection = async () => {
    try {
      addLog('Testing Supabase connection...')
      const supabase = createBrowserClient()
      
      // Test basic connection
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        addLog(`Session check error: ${error.message}`)
      } else {
        addLog('Session check successful')
      }

      // Test if we can reach the auth API
      const { data: { user: sessionUser }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        addLog(`User check error: ${userError.message}`)
      } else {
        addLog('User check successful')
      }
    } catch (error: any) {
      addLog(`Connection test failed: ${error.message}`)
    }
  }

  const testLogin = async () => {
    setIsTestingLogin(true)
    setLoginResult('')
    addLog('Starting login test...')
    
    try {
      const result = await login(testCredentials.email, testCredentials.password)
      addLog(`Login result: ${JSON.stringify(result)}`)
      
      if (result.success) {
        setLoginResult('Login successful! ✅')
        addLog('Login test completed successfully')
      } else {
        setLoginResult(`Login failed: ${result.error || 'Unknown error'} ❌`)
        addLog(`Login test failed: ${result.error}`)
      }
    } catch (error: any) {
      setLoginResult(`Login error: ${error.message} ❌`)
      addLog(`Login test error: ${error.message}`)
    } finally {
      setIsTestingLogin(false)
    }
  }

  const createTestUser = async () => {
    try {
      addLog('Creating test user...')
      const supabase = createBrowserClient()
      
      const { data, error } = await supabase.auth.signUp({
        email: testCredentials.email,
        password: testCredentials.password,
      })
      
      if (error) {
        addLog(`User creation error: ${error.message}`)
      } else {
        addLog('Test user created successfully (check email for confirmation)')
      }
    } catch (error: any) {
      addLog(`User creation failed: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Login Flow Test</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Auth State */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Loading:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${isLoading ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                  {isLoading ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="font-medium">Authenticated:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isAuthenticated ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="font-medium">User Email:</span> 
                <span className="ml-2 text-sm">{user?.email || 'None'}</span>
              </div>
            </div>
          </div>

          {/* Test Controls */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input 
                  type="email"
                  value={testCredentials.email}
                  onChange={(e) => setTestCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password:</label>
                <input 
                  type="password"
                  value={testCredentials.password}
                  onChange={(e) => setTestCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={testSupabaseConnection}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Test Connection
                </button>
                <button 
                  onClick={createTestUser}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Create Test User
                </button>
              </div>
              
              <button 
                onClick={testLogin}
                disabled={isTestingLogin}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
              >
                {isTestingLogin ? 'Testing Login...' : 'Test Login'}
              </button>
              
              {loginResult && (
                <div className="p-3 rounded bg-gray-50 border">
                  <span className="text-sm">{loginResult}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Auth Logs */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Auth Logs</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {authLogs.map((log, index) => (
              <div key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
                {log}
              </div>
            ))}
          </div>
          <button 
            onClick={() => setAuthLogs([])}
            className="mt-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Clear Logs
          </button>
        </div>
      </div>
    </div>
  )
}
