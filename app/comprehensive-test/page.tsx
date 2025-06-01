"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from '../context/TranslationContext'
import { useTheme } from 'next-themes'

export default function ComprehensiveTestPage() {
  const { isLoading, isAuthenticated, user, login } = useAuth()
  const { language, setLanguage, t } = useTranslation()
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  const [testResults, setTestResults] = useState<{
    authWorking: boolean
    translationWorking: boolean
    themeWorking: boolean
    preferencePersistence: boolean
  }>({
    authWorking: false,
    translationWorking: false,
    themeWorking: false,
    preferencePersistence: false
  })

  const [loginCredentials, setLoginCredentials] = useState({
    email: 'test@example.com',
    password: 'testpassword123'
  })

  const [isTestingLogin, setIsTestingLogin] = useState(false)
  const [loginResult, setLoginResult] = useState<string>('')

  // Test authentication functionality
  const testLogin = async () => {
    setIsTestingLogin(true)
    setLoginResult('')
    
    try {
      const result = await login(loginCredentials.email, loginCredentials.password)
      
      if (result.success) {
        setLoginResult('✅ Login successful!')
        setTestResults(prev => ({ ...prev, authWorking: true }))
      } else {
        setLoginResult(`❌ Login failed: ${result.error}`)
        setTestResults(prev => ({ ...prev, authWorking: false }))
      }
    } catch (error: any) {
      setLoginResult(`❌ Login error: ${error.message}`)
      setTestResults(prev => ({ ...prev, authWorking: false }))
    } finally {
      setIsTestingLogin(false)
    }
  }

  // Test translation functionality
  const testTranslations = () => {
    try {
      const testKeys = ['nav.home', 'nav.dashboard', 'common.loading', 'auth.login']
      const translations = testKeys.map(key => t(key))
      const allValid = translations.every(translation => translation && translation !== '')
      
      setTestResults(prev => ({ ...prev, translationWorking: allValid }))
      return allValid
    } catch (error) {
      setTestResults(prev => ({ ...prev, translationWorking: false }))
      return false
    }
  }

  // Test theme functionality
  const testTheme = () => {
    try {
      const hasTheme = theme !== undefined
      const hasResolvedTheme = resolvedTheme !== undefined
      const working = hasTheme && hasResolvedTheme
      
      setTestResults(prev => ({ ...prev, themeWorking: working }))
      return working
    } catch (error) {
      setTestResults(prev => ({ ...prev, themeWorking: false }))
      return false
    }
  }

  // Test preference persistence
  const testPreferencePersistence = () => {
    try {
      const savedLanguage = localStorage.getItem('language')
      const savedTheme = localStorage.getItem('theme')
      const persistence = !!(savedLanguage || savedTheme)
      
      setTestResults(prev => ({ ...prev, preferencePersistence: persistence }))
      return persistence
    } catch (error) {
      setTestResults(prev => ({ ...prev, preferencePersistence: false }))
      return false
    }
  }

  // Run tests on component mount
  useEffect(() => {
    const runTests = async () => {
      // Wait a bit for contexts to initialize
      setTimeout(() => {
        testTranslations()
        testTheme()
        testPreferencePersistence()
      }, 1000)
    }
    
    runTests()
  }, [])

  // Status indicators
  const getStatusIcon = (working: boolean) => working ? '✅' : '❌'
  const getStatusText = (working: boolean) => working ? 'Working' : 'Not Working'

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Comprehensive Application Test</h1>
        
        {/* System Status Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-card p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-2">Authentication</h3>
            <div className="text-2xl mb-2">{getStatusIcon(testResults.authWorking)}</div>
            <p className="text-sm text-muted-foreground">{getStatusText(testResults.authWorking)}</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-2">Translations</h3>
            <div className="text-2xl mb-2">{getStatusIcon(testResults.translationWorking)}</div>
            <p className="text-sm text-muted-foreground">{getStatusText(testResults.translationWorking)}</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-2">Dark Mode</h3>
            <div className="text-2xl mb-2">{getStatusIcon(testResults.themeWorking)}</div>
            <p className="text-sm text-muted-foreground">{getStatusText(testResults.themeWorking)}</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-2">Preferences</h3>
            <div className="text-2xl mb-2">{getStatusIcon(testResults.preferencePersistence)}</div>
            <p className="text-sm text-muted-foreground">{getStatusText(testResults.preferencePersistence)}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Authentication Test */}
          <div className="bg-card p-6 rounded-lg shadow border">
            <h2 className="text-2xl font-semibold mb-4">Authentication Test</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${isAuthenticated ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                  {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </span>
              </div>
              
              <div>
                <span className="font-medium">Loading:</span>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${isLoading ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}`}>
                  {isLoading ? 'Yes' : 'No'}
                </span>
              </div>
              
              {user && (
                <div>
                  <span className="font-medium">User:</span>
                  <span className="ml-2 text-sm">{user.email}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginCredentials.email}
                  onChange={(e) => setLoginCredentials(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border rounded bg-background"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border rounded bg-background"
                />
                <button
                  onClick={testLogin}
                  disabled={isTestingLogin}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
                >
                  {isTestingLogin ? 'Testing Login...' : 'Test Login'}
                </button>
              </div>
              
              {loginResult && (
                <div className="p-3 rounded bg-muted">
                  <span className="text-sm">{loginResult}</span>
                </div>
              )}
            </div>
          </div>

          {/* Preferences Test */}
          <div className="bg-card p-6 rounded-lg shadow border">
            <h2 className="text-2xl font-semibold mb-4">Preferences Test</h2>
            
            {/* Theme Testing */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Theme (Dark Mode)</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Current:</span>
                  <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">{theme}</span>
                </div>
                <div>
                  <span className="font-medium">Resolved:</span>
                  <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">{resolvedTheme}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTheme('light')}
                    className="px-3 py-1 bg-white text-black border rounded hover:bg-gray-100"
                  >
                    Light
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className="px-3 py-1 bg-gray-900 text-white border rounded hover:bg-gray-800"
                  >
                    Dark
                  </button>
                  <button 
                    onClick={() => setTheme('system')}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    System
                  </button>
                </div>
              </div>
            </div>

            {/* Language Testing */}
            <div>
              <h3 className="text-lg font-medium mb-3">Language (Translation)</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Current:</span>
                  <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">{language}</span>
                </div>
                <div>
                  <span className="font-medium">Sample:</span>
                  <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">{t('nav.dashboard')}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setLanguage('en')}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => setLanguage('lt')}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Lithuanian
                  </button>
                  <button 
                    onClick={() => setLanguage('ru')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Russian
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-card p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-semibold mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-3">
            <a href="/login" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Login Page
            </a>
            <a href="/dashboard" className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90">
              Dashboard
            </a>
            <a href="/settings" className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90">
              Settings
            </a>
            <a href="/properties" className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90">
              Properties
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
