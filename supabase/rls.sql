-- ===============================
-- RLS FOR SCHOOL ERP SYSTEM
-- ===============================

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;

-- ===============================
-- USERS TABLE POLICIES
-- ===============================

-- Drop old policies (idempotent)
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Users can view their own data
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Admins can manage all users
CREATE POLICY "Admins can manage all users"
  ON users FOR ALL
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'));

-- ===============================
-- STUDENTS TABLE POLICIES
-- ===============================

DROP POLICY IF EXISTS "Students can see their own profile" ON students;
DROP POLICY IF EXISTS "Teachers and Admins can view all students" ON students;

-- Students can view their own profile
CREATE POLICY "Students can see their own profile"
  ON students FOR SELECT
  USING (user_id = auth.uid());

-- Teachers and Admins can view all students
CREATE POLICY "Teachers and Admins can view all students"
  ON students FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('teacher', 'admin')));

-- ===============================
-- TEACHERS TABLE POLICIES
-- ===============================

DROP POLICY IF EXISTS "Teachers can view and edit their own profile" ON teachers;
DROP POLICY IF EXISTS "Admins can manage teachers" ON teachers;

-- Teachers can view and edit their own profile
CREATE POLICY "Teachers can view and edit their own profile"
  ON teachers FOR SELECT
  USING (user_id = auth.uid());

-- Admins can manage teachers
CREATE POLICY "Admins can manage teachers"
  ON teachers FOR ALL
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'));

-- ===============================
-- PARENTS TABLE POLICIES
-- ===============================

DROP POLICY IF EXISTS "Parents can view their linked student data" ON parents;

-- Parents can view their linked student data
CREATE POLICY "Parents can view their linked student data"
  ON parents FOR SELECT
  USING (user_id = auth.uid());

-- ===============================
-- ATTENDANCE TABLE POLICIES
-- ===============================

DROP POLICY IF EXISTS "Teachers can mark attendance" ON attendance;
DROP POLICY IF EXISTS "Students and Parents can view attendance" ON attendance;

-- Teachers can mark attendance (INSERT)
CREATE POLICY "Teachers can mark attendance"
  ON attendance FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'teacher'));

-- Students and Parents can view attendance
CREATE POLICY "Students and Parents can view attendance"
  ON attendance FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = attendance.student_id
      AND s.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM parents p
      WHERE p.user_id = auth.uid()
      AND p.student_id = attendance.student_id
    )
  );

-- ===============================
-- FEES TABLE POLICIES
-- ===============================

DROP POLICY IF EXISTS "Students and Parents can view fees" ON fees;
DROP POLICY IF EXISTS "Admins can update all fees" ON fees;

-- Students and Parents can view fees
CREATE POLICY "Students and Parents can view fees"
  ON fees FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = fees.student_id
      AND s.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM parents p
      WHERE p.user_id = auth.uid()
      AND p.student_id = fees.student_id
    )
  );

-- Admins can update all fees
CREATE POLICY "Admins can update all fees"
  ON fees FOR ALL
  USING (EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'));
