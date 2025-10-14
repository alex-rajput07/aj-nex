// app/student-dashboard/page.tsx
'use client';

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { Calendar, BookOpen, BarChart2, MessageSquare } from 'lucide-react';

const StudentDashboardPage = () => {
  // In a real app, this data would be fetched from Supabase
  const stats = [
    { title: "Upcoming Classes", value: "2", icon: Calendar, color: "#3b82f6" },
    { title: "Assignments Due", value: "3", icon: BookOpen, color: "#f97316" },
    { title: "Overall Attendance", value: "95%", icon: BarChart2, color: "#10b981" },
    { title: "New Messages", value: "1", icon: MessageSquare, color: "#8b5cf6" },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          ))}
        </div>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Timetable</h2>
          {/* In a real app, this would be a dynamic timetable */}
          <ul className="space-y-2">
            <li className="p-2 bg-gray-50 rounded-lg">09:00 AM - Math</li>
            <li className="p-2 bg-gray-50 rounded-lg">10:00 AM - Physics</li>
            <li className="p-2 bg-gray-50 rounded-lg">11:00 AM - Chemistry</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboardPage;