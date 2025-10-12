-- supabase/rls.sql
-- Enable RLS and create safe policies. Policies will reference auth.uid() safely via SELECT.

-- Note: These policies assume auth.uid() returns the user's UUID and that profiles.user_id stores that UUID.

-- Helper to get current auth uid (wrap SELECT for planner stability)
-- Not strictly necessary but helpful in policies
CREATE OR REPLACE FUNCTION public.current_auth_uid() RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT auth.uid();
$$;

REVOKE EXECUTE ON FUNCTION public.current_auth_uid() FROM anon, authenticated;

-- Enable RLS on tables that contain user-linked data (profiles, messages)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies for profiles: users can read and update their own profile (matching user_id), and authenticated users can insert their own
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((SELECT public.current_auth_uid()) IS NOT NULL AND user_id = (SELECT public.current_auth_uid()));

CREATE POLICY "profiles_insert_self" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT public.current_auth_uid()));

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT public.current_auth_uid()))
  WITH CHECK (user_id = (SELECT public.current_auth_uid()));

-- Messages: allow sender to insert messages where sender_id matches their profile id, allow receiver and sender to read messages
-- First a helper to get profile id by auth.uid()
CREATE OR REPLACE FUNCTION public.get_profile_id_by_auth_uid() RETURNS integer LANGUAGE sql STABLE AS $$
  SELECT id FROM public.profiles WHERE user_id = (SELECT public.current_auth_uid()) LIMIT 1;
$$;

REVOKE EXECUTE ON FUNCTION public.get_profile_id_by_auth_uid() FROM anon, authenticated;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_insert_sender" ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = public.get_profile_id_by_auth_uid());

CREATE POLICY "messages_select_participant" ON public.messages
  FOR SELECT
  TO authenticated
  USING (
    sender_id = public.get_profile_id_by_auth_uid()
    OR receiver_id = public.get_profile_id_by_auth_uid()
  );

CREATE POLICY "messages_update_sender_only" ON public.messages
  FOR UPDATE
  TO authenticated
  USING (sender_id = public.get_profile_id_by_auth_uid())
  WITH CHECK (sender_id = public.get_profile_id_by_auth_uid());

-- For other tables that are not tied to auth.uid(), we can allow authenticated users general access or keep RLS disabled.
-- Example: allow authenticated users to SELECT from classes and students
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "classes_select_auth" ON public.classes FOR SELECT TO authenticated USING (true);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students_select_auth" ON public.students FOR SELECT TO authenticated USING (true);

-- Attendance/grades/fees: restrict based on student->parent relation for parents, or allow authenticated users for read (adjust for your needs)
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "attendance_select_parent_or_teacher" ON public.attendance
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = (SELECT public.current_auth_uid())
      AND (p.id = (SELECT parent_id FROM public.students s WHERE s.id = attendance.student_id))
    )
  );

ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "grades_select_parent_or_teacher" ON public.grades
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = (SELECT public.current_auth_uid())
      AND (p.id = (SELECT parent_id FROM public.students s WHERE s.id = grades.student_id))
    )
  );

ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fees_select_parent" ON public.fees
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = (SELECT public.current_auth_uid())
      AND (p.id = (SELECT parent_id FROM public.students s WHERE s.id = fees.student_id))
    )
  );

-- Note: You may want to create INSERT/UPDATE policies for these tables depending on your app workflows.