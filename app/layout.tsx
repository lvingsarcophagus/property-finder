import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ThemeProvider } from "./components/ThemeProvider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PropertyFinder",
  description: "Find your dream property",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

