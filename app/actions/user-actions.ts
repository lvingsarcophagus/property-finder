"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createUserProfile(formData: FormData) {
  const supabase = createServerClient()

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const brokerType = formData.get("brokerType") as string

    // Get the user ID from the session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return { success: false, error: "Not authenticated" }
    }

    const { error } = await supabase.from("profiles").upsert({
      id: session.user.id,
      name,
      email,
      role,
      broker_type: brokerType,
      updated_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/profile")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating profile:", error)
    return { success: false, error: error.message }
  }
}

export async function updateUserProfile(formData: FormData) {
  const supabase = createServerClient()

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const bio = formData.get("bio") as string
    const companyName = formData.get("companyName") as string
    const licenseNumber = formData.get("licenseNumber") as string

    // Get the user ID from the session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return { success: false, error: "Not authenticated" }
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        name,
        email,
        phone,
        bio,
        company_name: companyName,
        license_number: licenseNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)

    if (error) throw error

    revalidatePath("/profile")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return { success: false, error: error.message }
  }
}
