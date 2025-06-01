import 'server-only';

import { createClient } from '@supabase/supabase-js'
import { cookies } from "next/headers"

// Server-side Supabase client (for server components, server actions, route handlers)
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        // Pass cookies for server-side auth
        Cookie: cookies().toString(),
      },
    },
  })
}
