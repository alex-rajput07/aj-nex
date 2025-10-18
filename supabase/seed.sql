-- ===============================
-- IDEMPOTENT SCHEMA + SEED FOR SCHOOL ERP
-- ===============================

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. DROP OLD TABLES TO START FRESH
DROP TABLE IF EXISTS fees, attendance, parents, students, teachers, profiles CASCADE;

-- 3. CREATE PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin','teacher','student','parent')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CREATE OTHER TABLES WITH UNIQUE CONSTRAINTS
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  class TEXT,
  section TEXT,
  roll_number TEXT
);

CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT,
  qualification TEXT
);

CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('Present','Absent','Leave')) NOT NULL,
  marked_by UUID REFERENCES teachers(id),
  UNIQUE (student_id, date)
);

CREATE TABLE IF NOT EXISTS fees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('Paid','Pending')) DEFAULT 'Pending',
  due_date DATE
);

-- 5. SET UP THE `handle_new_user` TRIGGER (IDEMPOTENT)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists, then create it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. CUSTOM FUNCTION TO CREATE AND SEED USERS (IDEMPOTENT)
CREATE OR REPLACE FUNCTION create_user(
  full_name TEXT,
  email TEXT,
  password TEXT,
  role TEXT
) RETURNS VOID AS $$
DECLARE
  instance_id UUID;
BEGIN
  -- Only create the user if they don't already exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE auth.users.email = create_user.email) THEN
    -- Get instance_id
    SELECT id INTO instance_id FROM auth.instances LIMIT 1;

    -- Create user in auth.users, which will trigger handle_new_user
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (instance_id, uuid_generate_v4(), 'authenticated', 'authenticated', email, crypt(password, gen_salt('bf')), '{"provider":"email","providers":["email"]}', jsonb_build_object('full_name', full_name, 'role', role), NOW(), NOW());
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 7. SEED THE USERS
DO $$
BEGIN
  PERFORM create_user('Admin Ajeet Singh', 'admin@ajerp.com', 'admin123', 'admin');
  PERFORM create_user('Teacher Ramesh', 'teacher@ajerp.com', 'teacher123', 'teacher');
  PERFORM create_user('Student Suresh', 'student@ajerp.com', 'student123', 'student');
  PERFORM create_user('Parent Mukesh', 'parent@ajerp.com', 'parent123', 'parent');
END;
$$;

-- 8. LINK PROFILES AND ADD SAMPLE DATA
INSERT INTO teachers (user_id, subject, qualification)
SELECT id, 'Mathematics', 'M.Sc Mathematics'
FROM profiles
WHERE role='teacher'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO students (user_id, class, section, roll_number)
SELECT id, '10', 'A', '23'
FROM profiles
WHERE role='student'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO parents (user_id, student_id)
SELECT p.id, s.id
FROM profiles p
CROSS JOIN students s
WHERE p.role='parent'
LIMIT 1
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO attendance (student_id, date, status, marked_by)
SELECT s.id, CURRENT_DATE, 'Present', t.id
FROM students s
CROSS JOIN teachers t
LIMIT 1
ON CONFLICT (student_id, date) DO NOTHING;

-- Since a student can have multiple fees, we don't use ON CONFLICT here.
-- The DROP TABLE at the beginning makes this part of the script idempotent.
INSERT INTO fees (student_id, amount, status, due_date)
SELECT id, 1000.00, 'Pending', CURRENT_DATE + INTERVAL '30 days'
FROM students;

-- Clean up the custom function
DROP FUNCTION IF EXISTS create_user(TEXT,TEXT,TEXT,TEXT);