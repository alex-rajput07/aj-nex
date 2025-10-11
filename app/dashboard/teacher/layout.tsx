import React from 'react';

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-xl">Teacher Dashboard</h1>
            </header>
            <main className="flex-1 p-4">
                {children}
            </main>
            <footer className="bg-gray-200 text-center p-2">
                <p>&copy; {new Date().getFullYear()} AJ ERP</p>
            </footer>
        </div>
    );
};

export default TeacherLayout;