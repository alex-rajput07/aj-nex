// app/teacher-dashboard/page.tsx
'use client';

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { Calendar, BarChart2, BookOpen, Users } from 'lucide-react';

const TeacherDashboardPage = () => {
  // In a real app, this data would be fetched from Supabase
  const stats = [
    { title: "Today's Classes", value: "4", icon: Calendar, color: "#3b82f6" },
    { title: "Pending Assignments", value: "3", icon: BookOpen, color: "#f97316" },
    { title: "Average Grade", value: "82%", icon: BarChart2, color: "#10b981" },
    { title: "Total Students", value: "120", icon: Users, color: "#8b5cf6" },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          ))}
        </div>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Schedule</h2>
          {/* In a real app, this would be a dynamic list of classes */}
          <ul className="space-y-2">
            <li className="p-2 bg-gray-50 rounded-lg">10:00 AM - Grade 10 Math</li>
            <li className="p-2 bg-gray-50 rounded-lg">11:00 AM - Grade 11 Physics</li>
            <li className="p-2 bg-gray-50 rounded-lg">01:00 PM - Grade 10 Math</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboardPage;