// app/admin-dashboard/page.tsx
'use client';

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { Users, School, BookOpen, MessageSquare } from 'lucide-react';

const AdminDashboardPage = () => {
  // In a real app, this data would be fetched from Supabase
  const stats = [
    { title: "Total Students", value: "1,250", icon: Users, color: "#3b82f6" },
    { title: "Total Teachers", value: "80", icon: School, color: "#10b981" },
    { title: "Classes", value: "45", icon: BookOpen, color: "#f97316" },
    { title: "Messages", value: "12", icon: MessageSquare, color: "#8b5cf6" },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          ))}
        </div>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Add New Student</button>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Add New Teacher</button>
            <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700">Send Announcement</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;