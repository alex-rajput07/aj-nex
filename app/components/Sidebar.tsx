"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { School } from "lucide-react";

import { cn } from "@/src/utils/cn";
import { Button } from "@/app/components/ui/Button";

export interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
    disabled?: boolean;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    navItems: NavItem[];
}

export function Sidebar({ className, navItems }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn("hidden border-r bg-muted/40 md:block", className)}>
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <School className="h-6 w-6" />
                        <span className="">AJ School ERP</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                    pathname === item.href && "bg-muted text-primary",
                                    item.disabled && "cursor-not-allowed opacity-50"
                                )}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}