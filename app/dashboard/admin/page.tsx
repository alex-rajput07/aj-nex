// app/dashboard/admin/page.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/Table";
import { Badge } from "@/app/components/ui/Badge";
import { Users, BookOpen, DollarSign, ArrowUp } from 'lucide-react';

// Mock data - in a real app, this would come from your database
const kpiData = [
    { title: "Total Students", value: "1,250", change: "+5%", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: "Total Teachers", value: "82", change: "+2", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: "New Admissions", value: "45", change: "+15%", icon: <BookOpen className="h-6 w-6 text-muted-foreground" /> },
    { title: "Revenue", value: "$56,890", change: "+10%", icon: <DollarSign className="h-6 w-6 text-muted-foreground" /> },
];

const enrollmentData = [
    { name: 'Jan', students: 400 },
    { name: 'Feb', students: 300 },
    { name: 'Mar', students: 500 },
    { name: 'Apr', students: 450 },
    { name: 'May', students: 600 },
    { name: 'Jun', students: 800 },
];

const recentUsers = [
    { name: "Alex Johnson", email: "alex.j@example.com", role: "student", status: "active" },
    { name: "Maria Garcia", email: "maria.g@example.com", role: "teacher", status: "active" },
    { name: "James Smith", email: "james.s@example.com", role: "parent", status: "pending" },
    { name: "Ravi Patel", email: "ravi.p@example.com", role: "student", status: "active" },
    { name: "Chloe Kim", email: "chloe.k@example.com", role: "teacher", status: "active" },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map(kpi => (
                    <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            {kpi.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center">
                                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                                {kpi.change} from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Enrollment Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={enrollmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="students" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentUsers.map(user => (
                                    <TableRow key={user.email}>
                                        <TableCell>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                                        <TableCell><Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}