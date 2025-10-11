import React from 'react';
import TeacherPerformance from './TeacherPerformance';
import DashboardSkeleton from '@/components/DashboardSkeleton';

const PrincipalDashboard = () => {
    // Simulate loading state
    const isLoading = false; // Replace with actual loading logic

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Principal Dashboard</h1>
            {isLoading ? (
                <DashboardSkeleton />
            ) : (
                <TeacherPerformance />
            )}
        </div>
    );
};

export default PrincipalDashboard;