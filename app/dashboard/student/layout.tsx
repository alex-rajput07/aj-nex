// app/dashboard/student/layout.tsx
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import { Home, Calendar, BookOpen, MessageSquare } from "lucide-react";

import DashboardLayout from "@/app/components/DashboardLayout";
import { NavItem } from "@/app/components/Sidebar";

export default async function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    const userRole = data.user.user_metadata?.role;
    if (userRole !== 'student') {
        redirect("/login"); 
    }

    const navItems: NavItem[] = [
        { href: "/dashboard/student", label: "Dashboard", icon: <Home /> },
        { href: "/dashboard/student/schedule", label: "My Schedule", icon: <Calendar />, disabled: true },
        { href: "/dashboard/student/grades", label: "My Grades", icon: <BookOpen />, disabled: true },
        { href: "/dashboard/student/assignments", label: "Assignments", icon: <BookOpen />, disabled: true },
        { href: "/dashboard/student/messages", label: "Messages", icon: <MessageSquare />, disabled: true },
    ];

    return (
        <DashboardLayout user={data.user} navItems={navItems}>
            {children}
        </DashboardLayout>
    );
}