-- ===============================
-- SEED DATA FOR SCHOOL ERP SYSTEM
-- ===============================

-- -------------------------------
-- CREATE ADMIN
-- -------------------------------
INSERT INTO users (id, full_name, email, password, role)
VALUES (gen_random_uuid(), 'Admin Ajeet Singh', 'admin@ajerp.com', 'admin123', 'admin')
ON CONFLICT (email) DO NOTHING;

-- -------------------------------
-- CREATE TEACHER
-- -------------------------------
INSERT INTO users (id, full_name, email, password, role)
VALUES (gen_random_uuid(), 'Teacher Ramesh', 'teacher@ajerp.com', 'teacher123', 'teacher')
ON CONFLICT (email) DO NOTHING;

-- -------------------------------
-- CREATE STUDENT
-- -------------------------------
INSERT INTO users (id, full_name, email, password, role)
VALUES (gen_random_uuid(), 'Student Suresh', 'student@ajerp.com', 'student123', 'student')
ON CONFLICT (email) DO NOTHING;

-- -------------------------------
-- CREATE PARENT
-- -------------------------------
INSERT INTO users (id, full_name, email, password, role)
VALUES (gen_random_uuid(), 'Parent Mukesh', 'parent@ajerp.com', 'parent123', 'parent')
ON CONFLICT (email) DO NOTHING;

-- -------------------------------
-- LINK TEACHER PROFILE
-- -------------------------------
INSERT INTO teachers (id, user_id, subject, qualification)
SELECT gen_random_uuid(), id, 'Mathematics', 'M.Sc Mathematics'
FROM users
WHERE role='teacher'
ON CONFLICT DO NOTHING;

-- -------------------------------
-- LINK STUDENT PROFILE
-- -------------------------------
INSERT INTO students (id, user_id, class, section, roll_number)
SELECT gen_random_uuid(), id, '10', 'A', '23'
FROM users
WHERE role='student'
ON CONFLICT DO NOTHING;

-- -------------------------------
-- LINK PARENT TO STUDENT
-- -------------------------------
INSERT INTO parents (id, user_id, student_id)
SELECT gen_random_uuid(), p.id, s.id
FROM users p
JOIN students s ON TRUE
WHERE p.role='parent'
ON CONFLICT DO NOTHING;

-- -------------------------------
-- ADD SAMPLE ATTENDANCE
-- -------------------------------
INSERT INTO attendance (id, student_id, date, status, marked_by)
SELECT gen_random_uuid(), s.id, CURRENT_DATE, 'Present', t.id
FROM students s
JOIN teachers t ON TRUE
LIMIT 1
ON CONFLICT DO NOTHING;

-- -------------------------------
-- ADD SAMPLE FEES
-- -------------------------------
INSERT INTO fees (id, student_id, amount, status, due_date)
SELECT gen_random_uuid(), s.id, 1000.00, 'Pending', CURRENT_DATE + INTERVAL '30 days'
FROM students s
ON CONFLICT DO NOTHING;
