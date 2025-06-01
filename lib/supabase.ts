import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

// Get environment variables (without assertions)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Client-side Supabase client (safe to use in client components)
export const createBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables')
  }
  
  return createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })
}

// Server-side Supabase client (for server components only)
export const createServerClient = async () => {
  const { cookies } = await import("next/headers")
  return createServerComponentClient({ cookies })
}

// For backward compatibility - client-side only
export const getBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables')
  }
  
  return createClientComponentClient({
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  })
}

// For backward compatibility
export const createSupabaseClient = () => {
  return getBrowserClient()
}
