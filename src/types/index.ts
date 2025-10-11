export interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'PRINCIPAL' | 'TEACHER' | 'PARENT';
}

export interface Student {
  id: string;
  name: string;
  classId: string;
  parentId: string;
}

export interface Class {
  id: string;
  name: string;
  section: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT';
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  score: number;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'DEFaULTER';
}

export interface Asset {
  id: string;
  name: string;
  quantity: number;
  location: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}