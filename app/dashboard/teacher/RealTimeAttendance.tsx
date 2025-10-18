"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import LottieLoading from '@/components/LottieLoading';
import FeedbackToast from '@/components/FeedbackToast';

interface Student {
  id: number;
  full_name: string;
}

const RealTimeAttendance = () => {
  const supabase = createClient();
  const [students, setStudents] = useState<Student[]>([]); // Assuming we fetch a list of students
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchAttendanceData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('attendance')
      .select('*, students(full_name)') // Example: join with students table
      .order('date', { ascending: false });

    if (error) {
      setFeedback({ message: 'Error fetching attendance data', type: 'error' });
    } else {
      // setAttendanceData(data); // You might want to process this data
      setFeedback({ message: 'Attendance data loaded successfully', type: 'success' });
    }
    setLoading(false);
  };

  const handleAttendanceSubmit = async (studentId: number, isPresent: boolean) => {
    setLoading(true);
    const { error } = await supabase
      .from('attendance')
      .insert([{ student_id: studentId, date: new Date(), is_present: isPresent }]);

    if (error) {
      setFeedback({ message: 'Error submitting attendance', type: 'error' });
    } else {
      setFeedback({ message: 'Attendance submitted successfully', type: 'success' });
      fetchAttendanceData(); // Refresh attendance data
    }
    setLoading(false);
  };

  // Fetch data on component mount
  useEffect(() => {
    // You should probably fetch the list of students for the class here
    // For now, let's just call the existing fetch function as an example.
    fetchAttendanceData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Real-Time Attendance</h1>
      {loading && <LottieLoading />}
      {feedback && <FeedbackToast message={feedback.message} type={feedback.type} />}
      <div className="mt-4">
        {/* This section should ideally list students, not past attendance records */}
        {students.map((student) => (
          <div key={student.id} className="flex justify-between items-center p-2 border-b">
            <span>{student.full_name}</span>
            <button onClick={() => handleAttendanceSubmit(student.id, true)} className="bg-green-500 text-white p-1 rounded">
              Present
            </button>
            <button onClick={() => handleAttendanceSubmit(student.id, false)} className="bg-red-500 text-white p-1 rounded">
              Absent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeAttendance;