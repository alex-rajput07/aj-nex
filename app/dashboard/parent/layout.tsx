import React from 'react';

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-xl font-bold">Parent Portal</h1>
            </header>
            <main className="p-4">
                {children}
            </main>
        </div>
    );
};

export default ParentLayout;