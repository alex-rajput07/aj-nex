import { supabase } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data, error } = await supabase.from("classes").select("*");

  if (error) {
    console.error("Supabase error:", error.message);
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-5 text-blue-600">Welcome to AJ ERP</h1>

      {error && <p className="text-red-500">Database Error: {error.message}</p>}

      {data && data.length > 0 ? (
        <ul className="space-y-2">
          {data.map((cls: any) => (
            <li key={cls.id} className="text-lg">{cls.name}</li>
          ))}
        </ul>
      ) : (
        <p>No data found in “classes” table.</p>
      )}
    </main>
  );
}
