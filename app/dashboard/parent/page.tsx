import React from 'react';
import FeePaymentPortal from './FeePaymentPortal';

const ParentDashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Parent Dashboard</h1>
            <FeePaymentPortal />
        </div>
    );
};

export default ParentDashboard;