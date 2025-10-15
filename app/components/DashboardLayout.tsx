// app/components/DashboardLayout.tsx
"use client";

import Link from "next/link";
import { Menu, School } from "lucide-react";
import { useState } from "react";

import { Button } from "@/app/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/Sheet";
import { UserNav } from "@/app/components/UserNav";
import { Sidebar, NavItem } from "@/app/components/Sidebar";

interface DashboardLayoutProps {
    user: any; // Replace with a proper user type
    navItems: NavItem[];
    children: React.ReactNode;
}

export default function DashboardLayout({ user, navItems, children }: DashboardLayoutProps) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar navItems={navItems} />
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                                >
                                    <School className="h-6 w-6" />
                                    <span>AJ School ERP</span>
                                </Link>
                                {navItems.map(item => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        {item.icon} 
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        {/* Can add search bar here if needed */}
                    </div>
                    <UserNav user={user} />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/40">
                    {children}
                </main>
            </div>
        </div>
    );
}