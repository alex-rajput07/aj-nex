import React from 'react';
import RealTimeAttendance from './RealTimeAttendance';

const TeacherDashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
            <RealTimeAttendance />
        </div>
    );
};

export default TeacherDashboard;