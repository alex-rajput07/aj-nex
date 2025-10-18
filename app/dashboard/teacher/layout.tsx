// app/dashboard/teacher/layout.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Home, Calendar, BookOpen, MessageSquare } from "lucide-react";

import DashboardLayout from "../../components/DashboardLayout";
import { NavItem } from "../../components/Sidebar";

export default async function TeacherDashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    const userRole = data.user.user_metadata?.role;
    if (userRole !== 'teacher') {
        redirect("/login"); 
    }

    const navItems: NavItem[] = [
        { href: "/dashboard/teacher", label: "Dashboard", icon: <Home /> },
        { href: "/dashboard/teacher/schedule", label: "My Schedule", icon: <Calendar />, disabled: true },
        { href: "/dashboard/teacher/attendance", label: "Attendance", icon: <BookOpen />, disabled: true },
        { href: "/dashboard/teacher/grades", label: "Grades", icon: <BookOpen />, disabled: true },
        { href: "/dashboard/teacher/messages", label: "Messages", icon: <MessageSquare />, disabled: true },
    ];

    return (
        <DashboardLayout user={data.user} navItems={navItems}>
            {children}
        </DashboardLayout>
    );
}