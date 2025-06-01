'use client'

import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a function to get the client with proper error handling
export const getSupabaseClient = () => {
  if (!supabaseUrl) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
  }
  if (!supabaseAnonKey) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Export the client for backward compatibility
export const supabase = (() => {
  try {
    return getSupabaseClient()
  } catch (error) {
    // During build time, this might fail, so we return null
    // The actual error will be thrown when the client is used
    console.warn('Supabase client not initialized during build:', error)
    return null as any
  }
})()
