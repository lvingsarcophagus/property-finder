"use client"

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@/lib/supabase-client'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function AuthTest() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('testpassword123')
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionInfo, setSessionInfo] = useState<string>('')

  const supabase = createBrowserClient()
  const { isAuthenticated, user, profile, isLoading: authLoading } = useAuth()
  const router = useRouter()

  // Check session status periodically
  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          setSessionInfo(`Session Error: ${error.message}`)
        } else if (session) {
          setSessionInfo(`Session Active: ${session.user?.email} (ID: ${session.user?.id})`)
        } else {
          setSessionInfo('No active session')
        }
      } catch (err) {
        setSessionInfo(`Session Check Failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    checkSessionStatus()
    const interval = setInterval(checkSessionStatus, 2000)

    return () => clearInterval(interval)
  }, [supabase])

  const testSignUp = async () => {
    setIsLoading(true)
    setResult('Testing sign up...')
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setResult(`Sign up error: ${error.message}`)
      } else {
        setResult(`Sign up successful! User: ${data.user?.email}, Session: ${data.session ? 'Yes' : 'No'}`)
      }
    } catch (err) {
      setResult(`Sign up failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testSignIn = async () => {
    setIsLoading(true)
    setResult('Testing sign in...')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setResult(`Sign in error: ${error.message}`)
      } else {
        setResult(`Sign in successful! User: ${data.user?.email}, Session: ${data.session ? 'Yes' : 'No'}`)
      }
    } catch (err) {
      setResult(`Sign in failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const checkCurrentSession = async () => {
    setIsLoading(true)
    setResult('Checking current session...')
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        setResult(`Session check error: ${error.message}`)
      } else if (session) {
        setResult(`Current session found: ${session.user?.email}`)
      } else {
        setResult('No current session found')
      }
    } catch (err) {
      setResult(`Session check failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const goToDashboard = () => {
    router.push('/dashboard')
  }

  const logout = async () => {
    setIsLoading(true)
    setResult('Logging out...')
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        setResult(`Logout error: ${error.message}`)
      } else {
        setResult('Logged out successfully')
      }
    } catch (err) {
      setResult(`Logout failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testConnection = async () => {
    setIsLoading(true)
    setResult('Testing Supabase connection...')
    
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1)
      
      if (error) {
        setResult(`Connection test failed: ${error.message}`)
      } else {
        setResult(`Connection test successful! Database is accessible.`)
      }
    } catch (err) {
      setResult(`Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="space-y-2">
          <button
            onClick={testConnection}
            disabled={isLoading}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Connection
          </button>
          
          <button
            onClick={testSignUp}
            disabled={isLoading}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Sign Up
          </button>
          
          <button
            onClick={testSignIn}
            disabled={isLoading}
            className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            Test Sign In
          </button>
          
          <button
            onClick={checkCurrentSession}
            disabled={isLoading}
            className="w-full p-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            Check Current Session
          </button>
          
          <button
            onClick={logout}
            disabled={isLoading}
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            Logout
          </button>
          
          <button
            onClick={goToDashboard}
            disabled={isLoading}
            className="w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
          >
            Go to Dashboard
          </button>
        </div>
        
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold">Result:</h3>
            <p className="text-sm mt-1">{result}</p>
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold">Auth Context Status:</h3>
          <div className="text-sm mt-1 space-y-1">
            <p><strong>Auth Loading:</strong> {authLoading ? 'Yes' : 'No'}</p>
            <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>User:</strong> {user ? `${user.email} (${user.id?.slice(0, 8)}...)` : 'None'}</p>
            <p><strong>Profile:</strong> {profile ? `${profile.name} (${profile.role})` : 'None'}</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 rounded">
          <h3 className="font-semibold">Session Status:</h3>
          <p className="text-sm mt-1">{sessionInfo}</p>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
          <p>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'}</p>
        </div>
      </div>
    </div>
  )
}
