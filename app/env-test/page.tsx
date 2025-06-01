"use client"

import { useEffect, useState } from 'react'

export default function EnvTestPage() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: string | undefined
    supabaseKey: string | undefined
    hasUrl: boolean
    hasKey: boolean
  }>({
    supabaseUrl: undefined,
    supabaseKey: undefined,
    hasUrl: false,
    hasKey: false
  })

  useEffect(() => {
    // Check if environment variables are available on client side
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    setEnvStatus({
      supabaseUrl: supabaseUrl || 'Not found',
      supabaseKey: supabaseKey ? `${supabaseKey.substring(0, 10)}...` : 'Not found',
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Environment Variables Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Supabase Configuration</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{envStatus.supabaseUrl}</span>
                <span className={`px-2 py-1 rounded text-xs ${envStatus.hasUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {envStatus.hasUrl ? 'OK' : 'Missing'}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">{envStatus.supabaseKey}</span>
                <span className={`px-2 py-1 rounded text-xs ${envStatus.hasKey ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {envStatus.hasKey ? 'OK' : 'Missing'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 rounded bg-gray-50">
            <h3 className="font-medium mb-2">Status</h3>
            {envStatus.hasUrl && envStatus.hasKey ? (
              <p className="text-green-600">✅ Environment variables are configured correctly</p>
            ) : (
              <div className="text-red-600">
                <p>❌ Missing environment variables:</p>
                <ul className="mt-2 ml-4">
                  {!envStatus.hasUrl && <li>• NEXT_PUBLIC_SUPABASE_URL</li>}
                  {!envStatus.hasKey && <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY</li>}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
