"use client"

import { useEffect, useState } from 'react'
import { useTranslation } from '../context/TranslationContext'
import { useTheme } from 'next-themes'

export default function PreferencesTestPage() {
  const { language, setLanguage, t } = useTranslation()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [localStorageState, setLocalStorageState] = useState<{
    theme: string | null
    language: string | null
  }>({
    theme: null,
    language: null
  })

  useEffect(() => {
    // Check localStorage values
    const savedTheme = localStorage.getItem('theme')
    const savedLanguage = localStorage.getItem('language')
    
    setLocalStorageState({
      theme: savedTheme,
      language: savedLanguage
    })
  }, [theme, language])

  const testThemeChange = (newTheme: string) => {
    console.log(`Changing theme to: ${newTheme}`)
    setTheme(newTheme)
  }

  const testLanguageChange = (newLanguage: string) => {
    console.log(`Changing language to: ${newLanguage}`)
    setLanguage(newLanguage)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Preferences Test</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Theme Testing */}
          <div className="bg-card p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Current Theme:</span> 
                <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">{theme}</span>
              </div>
              <div>
                <span className="font-medium">Resolved Theme:</span> 
                <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">{resolvedTheme}</span>
              </div>
              <div>
                <span className="font-medium">Saved in localStorage:</span> 
                <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">
                  {localStorageState.theme || 'None'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => testThemeChange('light')}
                  className="px-3 py-2 bg-white text-black border rounded hover:bg-gray-100"
                >
                  Light
                </button>
                <button 
                  onClick={() => testThemeChange('dark')}
                  className="px-3 py-2 bg-gray-900 text-white border rounded hover:bg-gray-800"
                >
                  Dark
                </button>
                <button 
                  onClick={() => testThemeChange('system')}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  System
                </button>
              </div>
            </div>
          </div>

          {/* Language Testing */}
          <div className="bg-card p-6 rounded-lg shadow border">
            <h2 className="text-xl font-semibold mb-4">Language Preferences</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Current Language:</span> 
                <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">{language}</span>
              </div>
              <div>
                <span className="font-medium">Saved in localStorage:</span> 
                <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">
                  {localStorageState.language || 'None'}
                </span>
              </div>
              <div>
                <span className="font-medium">Sample Translation:</span> 
                <span className="ml-2 px-2 py-1 bg-secondary rounded text-sm">
                  {t('nav.dashboard')}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => testLanguageChange('en')}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  English
                </button>
                <button 
                  onClick={() => testLanguageChange('lt')}
                  className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Lithuanian
                </button>
                <button 
                  onClick={() => testLanguageChange('ru')}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Russian
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Translation Test */}
        <div className="mt-6 bg-card p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Live Translation Test</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-medium mb-2">Navigation</h3>
              <ul className="space-y-1 text-sm">
                <li>{t('nav.home')}</li>
                <li>{t('nav.dashboard')}</li>
                <li>{t('nav.properties')}</li>
                <li>{t('nav.calendar')}</li>
                <li>{t('nav.settings')}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Common</h3>
              <ul className="space-y-1 text-sm">
                <li>{t('common.loading')}</li>
                <li>{t('common.save')}</li>
                <li>{t('common.cancel')}</li>
                <li>{t('common.submit')}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Auth</h3>
              <ul className="space-y-1 text-sm">
                <li>{t('auth.login')}</li>
                <li>{t('auth.logout')}</li>
                <li>{t('auth.register')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
