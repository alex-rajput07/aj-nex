-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP old tables for clean slate (optional)
DROP TABLE IF EXISTS fees, attendance, parents, students, teachers, users CASCADE;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin','teacher','student','parent')) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  class TEXT,
  section TEXT,
  roll_number TEXT
);

-- TEACHERS TABLE
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT,
  qualification TEXT
);

-- PARENTS TABLE
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE
);

-- ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('Present','Absent','Leave')) NOT NULL,
  marked_by UUID REFERENCES teachers(id)
);

-- FEES TABLE
CREATE TABLE IF NOT EXISTS fees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('Paid','Pending')) DEFAULT 'Pending',
  due_date DATE
);
