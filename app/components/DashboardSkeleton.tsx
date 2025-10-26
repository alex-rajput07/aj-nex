import React from 'react';

const DashboardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className="animate-pulse bg-gray-300 h-10 w-1/2"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-1/4"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-3/4"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-1/3"></div>
            <div className="animate-pulse bg-gray-300 h-40 w-full"></div>
        </div>
    );
};

export default DashboardSkeleton;