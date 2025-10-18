import { createClient } from "@/utils/supabase/server";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}