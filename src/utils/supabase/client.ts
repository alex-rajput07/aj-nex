import { createClient } from '@supabase/supabase-js'

// ✅ Environment variables — add them in Vercel settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ✅ Create a Supabase client for client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ✅ Optional: backward compatible export for old imports
export const createClientSupabaseClient = () => supabase