import { createClient } from '@supabase/supabase-js';

// This server-side client uses the service_role key, which bypasses RLS.
// It's suitable for fetching public data or for admin tasks.
// IMPORTANT: Never expose the service_role key to the client-side.
// Make sure SUPABASE_SERVICE_ROLE_KEY is set in your environment variables.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, serviceKey);