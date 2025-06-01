"use client"

import { useTranslation } from "../context/TranslationContext"
import { useEffect } from "react"

export default function LanguageUpdater() {
  const { language } = useTranslation()

  useEffect(() => {
    // Update the document language attribute when language changes
    document.documentElement.lang = language
  }, [language])

  return null
}
