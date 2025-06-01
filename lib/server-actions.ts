"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side admin client with service role (only for server actions)
const getServiceClient = () => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Example admin action that uses the service role
export async function adminCreateUser(email: string, password: string, userData: any) {
  const supabase = getServiceClient()

  try {
    // Create the user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) throw authError

    // Create the profile
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert([{ id: authData.user.id, ...userData }])

      if (profileError) throw profileError
    }

    return { success: true, user: authData.user }
  } catch (error: any) {
    console.error("Admin create user error:", error)
    return { success: false, error: error.message }
  }
}

// Example admin action to get all users
export async function adminGetAllUsers() {
  const supabase = getServiceClient()

  try {
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) throw error

    return { success: true, users: data.users }
  } catch (error: any) {
    console.error("Admin get all users error:", error)
    return { success: false, error: error.message }
  }
}
