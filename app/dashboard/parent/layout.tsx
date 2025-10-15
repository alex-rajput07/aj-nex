// app/dashboard/parent/layout.tsx
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import { Home, User, Wallet, MessageSquare } from "lucide-react";

import DashboardLayout from "@/app/components/DashboardLayout";
import { NavItem } from "@/app/components/Sidebar";

export default async function ParentDashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    const userRole = data.user.user_metadata?.role;
    if (userRole !== 'parent') {
        redirect("/login"); 
    }

    const navItems: NavItem[] = [
        { href: "/dashboard/parent", label: "Dashboard", icon: <Home /> },
        { href: "/dashboard/parent/children", label: "My Children", icon: <User />, disabled: true },
        { href: "/dashboard/parent/fees", label: "Fee Payment", icon: <Wallet />, disabled: true },
        { href: "/dashboard/parent/messages", label: "Messages", icon: <MessageSquare />, disabled: true },
    ];

    return (
        <DashboardLayout user={data.user} navItems={navItems}>
            {children}
        </DashboardLayout>
    );
}