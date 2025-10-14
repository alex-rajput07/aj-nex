// app/components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, BarChart2, MessageSquare, Settings } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '', icon: Home },
  { name: 'Attendance', href: '/attendance', icon: Calendar },
  { name: 'Results', href: '/results', icon: BarChart2 },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = ({ role }: { role: string }) => {
  const pathname = usePathname();
  const baseDashboardUrl = `/${role}-dashboard`;

  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">{role} Menu</h2>
      </div>
      <nav className="p-2">
        <ul>
          {navItems.map((item) => {
            const href = `${baseDashboardUrl}${item.href}`;
            const isActive = pathname === href;
            return (
              <li key={item.name}>
                <Link
                  href={href}
                  className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : ''}`}
                >
                  <item.icon size={20} />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;