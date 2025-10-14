// app/components/DashboardLayout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import { LogOut, User } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('erp_role');
    const savedUser = localStorage.getItem('erp_user');
    if (!savedRole) {
      router.push('/login');
    } else {
      setRole(savedRole);
      setUsername(savedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('erp_role');
    localStorage.removeItem('erp_user');
    router.push('/login');
  };

  if (!role || !username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 border-b z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User size={20} className="text-gray-500" />
              <span className="ml-2 font-semibold text-gray-700">
                Welcome, <span className="capitalize">{username}</span> (<span className="capitalize">{role}</span>)
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-600 hover:text-red-500"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;