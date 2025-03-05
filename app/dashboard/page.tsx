"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EnhancedUserDashboard from "../components/EnhancedUserDashboard"
import LoadingAnimation from "../components/LoadingAnimation"

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    // This is a mock authentication check. In a real app, you'd verify the user's session or token
    const checkAuth = async () => {
      // Simulating an API call to check authentication
      const response = await new Promise((resolve) => setTimeout(() => resolve(true), 2500))
      setIsAuthenticated(response as boolean)
      if (!response) {
        router.push("/login")
      }
      // Add a slight delay to show the loading animation
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return <LoadingAnimation />
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <EnhancedUserDashboard />
    </div>
  )
}

