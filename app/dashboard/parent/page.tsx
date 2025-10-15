"use client";

export const dynamic = 'force-dynamic';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar";
import { AlertCircle, CheckCircle, Bell } from 'lucide-react';

// Mock Data
const children = [
    {
        name: "Alex Johnson",
        grade: "10A",
        avatar: "/avatars/alex.png",
        attendance: "95%",
        gpa: "3.8",
        recentGrade: { subject: "Chemistry", grade: "A-" },
    },
    {
        name: "Jessica Johnson",
        grade: "8C",
        avatar: "/avatars/jessica.png",
        attendance: "98%",
        gpa: "3.9",
        recentGrade: { subject: "English", grade: "A" },
    },
];

const feeStatus = {
    amountDue: "$250.00",
    dueDate: "2025-11-01",
    status: "Pending",
};

const announcements = [
    { title: "Annual Sports Day", date: "2025-10-25" },
    { title: "Holiday: Diwali Break", date: "2025-11-05" },
];

export default function ParentDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {children.map(child => (
                        <Card key={child.name}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={child.avatar} />
                                    <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{child.name}</CardTitle>
                                    <CardDescription>Grade {child.grade}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold">{child.attendance}</p>
                                        <p className="text-sm text-muted-foreground">Attendance</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{child.gpa}</p>
                                        <p className="text-sm text-muted-foreground">GPA</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{child.recentGrade.grade}</p>
                                        <p className="text-sm text-muted-foreground">Recent Grade ({child.recentGrade.subject})</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Fee Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-3xl font-bold">{feeStatus.amountDue}</p>
                                    <p className="text-muted-foreground">Due by {feeStatus.dueDate}</p>
                                </div>
                                <div className="flex items-center">
                                    {feeStatus.status === 'Paid' ? <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> : <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />}
                                    <Badge variant={feeStatus.status === 'Paid' ? 'default' : 'destructive'}>{feeStatus.status}</Badge>
                                </div>
                                <Button className="w-full">Pay Now</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>School Announcements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {announcements.map(item => (
                                    <li key={item.title} className="flex items-center gap-3">
                                        <Bell className="h-5 w-5 text-primary" />
                                        <div>
                                            <p className="font-medium">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">{item.date}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}