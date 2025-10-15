// app/dashboard/teacher/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/Table";
import { Badge } from "@/app/components/ui/Badge";
import { Calendar, Clock, Users, Megaphone } from 'lucide-react';

// Mock Data
const schedule = [
    { time: "09:00 - 10:00", subject: "Mathematics", grade: "10A" },
    { time: "10:15 - 11:15", subject: "Physics", grade: "12B" },
    { time: "11:30 - 12:30", subject: "Mathematics", grade: "10A" },
    { time: "01:30 - 02:30", subject: "Physics", grade: "11A" },
];

const students = [
    { id: "S001", name: "Alice Johnson", grade: "10A", attendance: "95%" },
    { id: "S002", name: "Bob Williams", grade: "12B", attendance: "98%" },
    { id: "S003", name: "Charlie Brown", grade: "10A", attendance: "92%" },
    { id: "S004", name: "Diana Miller", grade: "11A", attendance: "96%" },
];

const announcements = [
    { title: "Parent-Teacher Meeting", date: "2025-10-20", content: "The quarterly parent-teacher meeting will be held next Monday." },
    { title: "Science Fair Submissions", date: "2025-10-18", content: "Final date for science fair project submissions is this Friday." },
];

export default function TeacherDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Class</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Maths - 10A</div>
                        <p className="text-xs text-muted-foreground">9:00 AM - 10:00 AM</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">Across 4 classes</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schedule.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center"><Clock className="h-4 w-4 mr-2" />{item.time}</TableCell>
                                        <TableCell>{item.subject}</TableCell>
                                        <TableCell><Badge variant="secondary">{item.grade}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>My Students</CardTitle>
                        <CardDescription>A brief list of students in your classes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Attendance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map(student => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell><Badge variant="outline">{student.grade}</Badge></TableCell>
                                        <TableCell>{student.attendance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {announcements.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <Megaphone className="h-6 w-6 text-muted-foreground mt-1" />
                            <div>
                                <p className="font-semibold">{item.title} <span className="font-normal text-sm text-muted-foreground">- {item.date}</span></p>
                                <p className="text-sm text-muted-foreground">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}