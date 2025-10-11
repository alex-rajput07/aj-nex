'use client';
import React, { useState } from 'react';

const HRConfig = () => {
    const [leaveTypes, setLeaveTypes] = useState(['Sick Leave', 'Casual Leave', 'Earned Leave']);
    const [newLeaveType, setNewLeaveType] = useState('');

    const handleAddLeaveType = () => {
        if (newLeaveType) {
            setLeaveTypes([...leaveTypes, newLeaveType]);
            setNewLeaveType('');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">HR Configuration</h1>
            <div className="mb-4">
                <h2 className="text-xl">Leave Types</h2>
                <ul className="list-disc pl-5">
                    {leaveTypes.map((type, index) => (
                        <li key={index}>{type}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={newLeaveType}
                    onChange={(e) => setNewLeaveType(e.target.value)}
                    placeholder="Add new leave type"
                    className="border p-2 rounded"
                />
                <button
                    onClick={handleAddLeaveType}
                    className="ml-2 bg-blue-500 text-white p-2 rounded"
                >
                    Add
                </button>
            </div>
            <div>
                <h2 className="text-xl">Salary Structures</h2>
                {/* Additional salary structure configuration can be added here */}
            </div>
        </div>
    );
};

export default HRConfig;