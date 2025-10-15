export const dynamic = 'force-dynamic';

import React from 'react';
import AssetTracking from './AssetTracking';
import DashboardSkeleton from '@/components/DashboardSkeleton';

const ManagerDashboard = () => {
    // Simulate loading state
    const isLoading = false; // Replace with actual loading logic

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
            {isLoading ? (
                <DashboardSkeleton />
            ) : (
                <AssetTracking />
            )}
        </div>
    );
};

export default ManagerDashboard;