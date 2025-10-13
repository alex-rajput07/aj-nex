import { createClient } from '@supabase/supabase-js'

// ✅ Use your environment variables (not hardcoded keys)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function TestSupabasePage() {
  // Try fetching some data from the "classes" table
  const { data, error } = await supabase.from('classes').select('*')

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h2>❌ Supabase Connection Failed</h2>
        <p>Error message:</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>✅ Supabase Connected Successfully!</h2>
      <p>Fetched {data.length} classes:</p>
      <ul>
        {data.map((cls) => (
          <li key={cls.id}>
            {cls.name} — Section {cls.section}
          </li>
        ))}
      </ul>
    </div>
  )
}
