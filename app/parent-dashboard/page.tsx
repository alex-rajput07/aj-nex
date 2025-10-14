// app/parent-dashboard/page.tsx
'use client';

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { UserCheck, BarChart2, Bell, Wallet } from 'lucide-react';

const ParentDashboardPage = () => {
  // In a real app, this data would be fetched from Supabase
  const stats = [
    { title: "Child's Attendance", value: "95%", icon: UserCheck, color: "#10b981" },
    { title: "Recent Grades", value: "A", icon: BarChart2, color: "#3b82f6" },
    { title: "Pending Fees", value: "$150", icon: Wallet, color: "#f97316" },
    { title: "Notifications", value: "2", icon: Bell, color: "#8b5cf6" },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          ))}
        </div>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          {/* In a real app, this would be a dynamic list of activities */}
          <ul className="space-y-2">
            <li className="p-2 bg-gray-50 rounded-lg">Your child, Rohan, was marked present today.</li>
            <li className="p-2 bg-gray-50 rounded-lg">New grade posted for Math: A+</li>
            <li className="p-2 bg-gray-50 rounded-lg">Upcoming parent-teacher meeting on 25th Oct.</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboardPage;