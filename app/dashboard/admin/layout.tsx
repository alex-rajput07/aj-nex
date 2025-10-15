// app/dashboard/admin/layout.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Home, Users, Settings, BarChart } from "lucide-react";

import DashboardLayout from "../../components/DashboardLayout";
import { NavItem } from "@/app/components/Sidebar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    // In a real app, you'd fetch the user's role from your database.
    // For this example, we'll assume the role is in user_metadata.
    const userRole = data.user.user_metadata?.role;
    if (userRole !== 'admin') {
        // Or redirect to a generic dashboard / error page
        redirect("/login"); 
    }

    const navItems: NavItem[] = [
        { href: "/dashboard/admin", label: "Dashboard", icon: <Home /> },
        { href: "/dashboard/admin/users", label: "Manage Users", icon: <Users />, disabled: true },
        { href: "/dashboard/admin/analytics", label: "Analytics", icon: <BarChart />, disabled: true },
        { href: "/dashboard/admin/settings", label: "Settings", icon: <Settings />, disabled: true },
    ];

    return (
        <DashboardLayout user={data.user} navItems={navItems}>
            {children}
        </DashboardLayout>
    );
}