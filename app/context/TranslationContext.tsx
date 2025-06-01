"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language, type TranslationKey } from "../translations"

interface TranslationContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export const useTranslation = () => useContext(TranslationContext)

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Prevent hydration mismatch
    setMounted(true)

    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "lt" || savedLanguage === "ru")) {
      setLanguageState(savedLanguage)
      console.log("Loaded language from localStorage:", savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
    console.log("Language changed to:", newLanguage)
  }

  const t = (key: TranslationKey): string => {
    // During SSR or before hydration, return English translation to avoid mismatch
    if (!mounted) {
      return translations.en[key] || key
    }

    return translations[language][key] || translations.en[key] || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}
