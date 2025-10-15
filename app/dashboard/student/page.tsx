"use client";

export const dynamic = 'force-dynamic';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";
import { Book, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// Mock Data
const upcomingClasses = [
    { time: "09:00", subject: "Mathematics", teacher: "Mr. Davison" },
    { time: "10:15", subject: "Physics", teacher: "Mrs. Ray" },
    { time: "11:30", subject: "History", teacher: "Mr. Fitz" },
];

const recentGrades = [
    { subject: "Chemistry", grade: "A-", date: "2025-10-12" },
    { subject: "Literature", grade: "B+", date: "2025-10-10" },
    { subject: "Algebra II", grade: "A", date: "2025-10-09" },
];

const assignments = [
    { subject: "History", title: "Essay on the Renaissance", due: "2025-10-20", status: "Pending" },
    { subject: "Physics", title: "Lab Report #3", due: "2025-10-18", status: "Pending" },
    { subject: "Literature", title: "Read 'The Great Gatsby' Ch. 1-3", due: "2025-10-15", status: "Completed" },
];

export default function StudentDashboardPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome Back, Alex!</CardTitle>
                    <CardDescription>Here's a summary of your academic progress.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="font-medium">Overall Attendance</p>
                            <Progress value={94} className="mt-2" />
                            <p className="text-sm text-muted-foreground mt-1">94%</p>
                        </div>
                        <div>
                            <p className="font-medium">Overall GPA</p>
                            <p className="text-3xl font-bold">3.8 / 4.0</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                {upcomingClasses.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="flex items-center"><Clock className="h-4 w-4 mr-2 text-muted-foreground" />{item.time}</TableCell>
                                        <TableCell className="font-medium">{item.subject}</TableCell>
                                        <TableCell className="text-muted-foreground">{item.teacher}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Grades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                {recentGrades.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.subject}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell><Badge>{item.grade}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pending Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Task</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignments.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell><Badge variant="secondary">{item.subject}</Badge></TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.due}</TableCell>
                                    <TableCell className="flex items-center">
                                        {item.status === 'Completed' ? <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> : <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />}
                                        {item.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}