"use client"

import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

export default function AuthDebugPage() {
  const { isAuthenticated, isLoading, user, profile } = useAuth()
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  useEffect(() => {
    const addDebugInfo = (message: string) => {
      setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    }

    addDebugInfo('Auth debug page mounted')
    addDebugInfo(`isLoading: ${isLoading}`)
    addDebugInfo(`isAuthenticated: ${isAuthenticated}`)
    addDebugInfo(`user: ${user ? 'exists' : 'null'}`)
    addDebugInfo(`profile: ${profile ? 'exists' : 'null'}`)
  }, [isAuthenticated, isLoading, user, profile])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Authentication Debug</h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Loading:</span> 
                <span className={isLoading ? 'text-orange-600' : 'text-green-600'}>
                  {isLoading ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="font-medium">Authenticated:</span> 
                <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                  {isAuthenticated ? 'Yes' : 'No'}
                </span>
              </div>
              <div>
                <span className="font-medium">User:</span> 
                <span className={user ? 'text-green-600' : 'text-gray-600'}>
                  {user ? user.email || 'User exists' : 'None'}
                </span>
              </div>
              <div>
                <span className="font-medium">Profile:</span> 
                <span className={profile ? 'text-green-600' : 'text-gray-600'}>
                  {profile ? profile.name || 'Profile exists' : 'None'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Debug Log</h2>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
                  {info}
                </div>
              ))}
            </div>
          </div>

          {user && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">User Details</h2>
              <pre className="text-sm bg-gray-50 p-4 rounded overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}

          {profile && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
              <pre className="text-sm bg-gray-50 p-4 rounded overflow-auto">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
