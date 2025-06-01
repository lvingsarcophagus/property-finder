import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./components/ThemeProvider"
import { TranslationProvider } from "./context/TranslationContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PropertyPro - Professional Real Estate Platform",
  description:
    "The ultimate platform for real estate professionals to manage properties, clients, and grow their business.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TranslationProvider>
            <AuthProvider>{children}</AuthProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
