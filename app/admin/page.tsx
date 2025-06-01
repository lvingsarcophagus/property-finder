"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminDashboard } from "@/app/components/AdminDashboard"
import { createBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/app/context/AuthContext"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const supabase = createBrowserClient()

  useEffect(() => {
    async function checkAdminAndLoadData() {
      // Wait for auth to load
      if (isLoading) return

      // Redirect if not authenticated
      if (!isAuthenticated) {
        router.push("/login?redirect=/admin")
        return
      }

      try {
        // Get user profile to check role
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()

        // If not admin, redirect to dashboard
        if (!profile || profile.role !== "admin") {
          router.push("/dashboard")
          return
        }

        // Fetch admin data
        const [usersResponse, propertiesResponse] = await Promise.all([
          supabase.from("profiles").select("*").order("created_at", { ascending: false }),
          supabase.from("properties").select("*").order("created_at", { ascending: false })
        ])

        setUsers(usersResponse.data || [])
        setProperties(propertiesResponse.data || [])
      } catch (error) {
        console.error("Error loading admin data:", error)
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    checkAdminAndLoadData()
  }, [isAuthenticated, isLoading, user, router, supabase])

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <AdminDashboard users={users} properties={properties} />
}
