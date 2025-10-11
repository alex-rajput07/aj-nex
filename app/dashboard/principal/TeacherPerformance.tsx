'use client';
import React, { useEffect, useState } from 'react';
import { createClientSupabaseClient } from '@/utils/supabase/client';
import DashboardSkeleton from '@/components/DashboardSkeleton';
import FeedbackToast from '@/components/FeedbackToast';

interface PerformanceData {
  id: number;
  name: string;
  attendance_rate: number;
  average_grade: string;
}

const TeacherPerformance = () => {
    const supabase = createClientSupabaseClient();
    const [loading, setLoading] = useState(true);
    const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const { data, error } = await supabase
                    .from('teacher_performance')
                    .select('*');

                if (error) throw error;

                setPerformanceData(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceData();
    }, []);

    if (loading) return <DashboardSkeleton />;
    if (error) return <FeedbackToast message={error} type="error" />;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Teacher Performance Metrics</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Teacher Name</th>
                        <th className="py-2 px-4 border-b">Attendance Rate</th>
                        <th className="py-2 px-4 border-b">Average Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {performanceData.map((teacher) => (
                        <tr key={teacher.id}>
                            <td className="py-2 px-4 border-b">{teacher.name}</td>
                            <td className="py-2 px-4 border-b">{teacher.attendance_rate}%</td>
                            <td className="py-2 px-4 border-b">{teacher.average_grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherPerformance;