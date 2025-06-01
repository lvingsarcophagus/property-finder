import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/app/components/AdminDashboard"

export default async function AdminPage() {
  const supabase = createServerClient()

  // Check if user is authenticated and has admin role
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin")
  }

  // Get user profile to check role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  // If not admin, redirect to dashboard
  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  // Fetch admin data
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  const { data: properties } = await supabase.from("properties").select("*").order("created_at", { ascending: false })

  return <AdminDashboard users={users || []} properties={properties || []} />
}
