-- supabase/seed.sql
-- Minimal seed data that matches schema and policies

-- Insert a couple of profiles (no auth link for local testing; set user_id to some UUIDs if you want)
INSERT INTO public.profiles (name, role, staff_id, student_id, user_id)
VALUES
  ('Alice Admin', 'ADMIN', NULL, NULL, NULL),
  ('Tom Teacher', 'TEACHER', 1001, NULL, NULL),
  ('Pat Parent', 'PARENT', NULL, NULL, NULL);

-- Classes
INSERT INTO public.classes (name, section, teacher_id)
VALUES
  ('Mathematics', 'A', 2),
  ('Science', 'B', 2);

-- Students
INSERT INTO public.students (name, class_id, parent_id, date_of_birth, gender)
VALUES
  ('Student One', 1, 3, '2010-05-14', 'F'),
  ('Student Two', 2, 3, '2009-10-20', 'M');

-- Attendance
INSERT INTO public.attendance (student_id, date, status)
VALUES
  (1, CURRENT_DATE, 'PRESENT'),
  (2, CURRENT_DATE, 'ABSENT');

-- Grades
INSERT INTO public.grades (student_id, subject, grade)
VALUES
  (1, 'Math', 'A'),
  (2, 'Science', 'B');

-- Fees
INSERT INTO public.fees (student_id, amount, status, due_date)
VALUES
  (1, 150.00, 'paid', CURRENT_DATE - INTERVAL '30 days'),
  (2, 200.00, 'pending', CURRENT_DATE + INTERVAL '15 days');

-- Assets
INSERT INTO public.assets (name, quantity, description)
VALUES
  ('Projector', 2, 'Classroom projectors'),
  ('Textbooks', 120, 'Math textbooks');

-- Messages (use sender_id/receiver_id that exist in profiles)
INSERT INTO public.messages (sender_id, receiver_id, content)
VALUES
  (2, 3, 'Hello parent, this is a test message from teacher.'),
  (3, 2, 'Thanks, teacher. Received.');