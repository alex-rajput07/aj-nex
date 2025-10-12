-- supabase/schema.sql
-- Create minimal school-related schema (non-destructive: IF NOT EXISTS)

-- Ensure uuid-ossp or pgcrypto usually available; we rely on uuid in auth so keep simple.

-- profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id serial PRIMARY KEY,
  name varchar,
  role varchar CHECK (role::text = ANY (ARRAY['ADMIN','MANAGER','PRINCIPAL','TEACHER','PARENT']::text[])),
  staff_id integer,
  student_id integer,
  user_id uuid  -- links to auth.users.id in Supabase auth
);

-- classes
CREATE TABLE IF NOT EXISTS public.classes (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  section varchar,
  teacher_id integer REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- students
CREATE TABLE IF NOT EXISTS public.students (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  class_id integer REFERENCES public.classes(id) ON DELETE SET NULL,
  parent_id integer REFERENCES public.profiles(id) ON DELETE SET NULL,
  date_of_birth date,
  gender varchar
);

-- attendance
CREATE TABLE IF NOT EXISTS public.attendance (
  id serial PRIMARY KEY,
  student_id integer REFERENCES public.students(id) ON DELETE CASCADE,
  date date NOT NULL,
  status varchar CHECK (status::text = ANY (ARRAY['PRESENT','ABSENT']::text[]))
);

-- grades
CREATE TABLE IF NOT EXISTS public.grades (
  id serial PRIMARY KEY,
  student_id integer REFERENCES public.students(id) ON DELETE CASCADE,
  subject varchar NOT NULL,
  grade varchar NOT NULL
);

-- fees
CREATE TABLE IF NOT EXISTS public.fees (
  id serial PRIMARY KEY,
  student_id integer REFERENCES public.students(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status varchar CHECK (status::text = ANY (ARRAY['paid','pending','defaulter']::text[])),
  due_date date
);

-- assets
CREATE TABLE IF NOT EXISTS public.assets (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  description text
);

-- messages
CREATE TABLE IF NOT EXISTS public.messages (
  id serial PRIMARY KEY,
  sender_id integer REFERENCES public.profiles(id) ON DELETE SET NULL,
  receiver_id integer REFERENCES public.profiles(id) ON DELETE SET NULL,
  content text,
  "timestamp" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_students_class_id ON public.students(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON public.attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_grades_student ON public.grades(student_id);
CREATE INDEX IF NOT EXISTS idx_fees_student ON public.fees(student_id);