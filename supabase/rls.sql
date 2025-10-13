-- ...existing code...

-- Profiles policies
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((SELECT public.current_auth_uid()) IS NOT NULL AND user_id = (SELECT public.current_auth_uid()));

DROP POLICY IF EXISTS "profiles_insert_self" ON public.profiles;
CREATE POLICY "profiles_insert_self" ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT public.current_auth_uid()));

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT public.current_auth_uid()))
  WITH CHECK (user_id = (SELECT public.current_auth_uid()));

-- Messages policies
DROP POLICY IF EXISTS "messages_insert_sender" ON public.messages;
CREATE POLICY "messages_insert_sender" ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = public.get_profile_id_by_auth_uid());

DROP POLICY IF EXISTS "messages_select_participant" ON public.messages;
CREATE POLICY "messages_select_participant" ON public.messages
  FOR SELECT
  TO authenticated
  USING (
    sender_id = public.get_profile_id_by_auth_uid()
    OR receiver_id = public.get_profile_id_by_auth_uid()
  );

DROP POLICY IF EXISTS "messages_update_sender_only" ON public.messages;
CREATE POLICY "messages_update_sender_only" ON public.messages
  FOR UPDATE
  TO authenticated
  USING (sender_id = public.get_profile_id_by_auth_uid())
  WITH CHECK (sender_id = public.get_profile_id_by_auth_uid());

-- Classes policies
DROP POLICY IF EXISTS "allow_public_read" ON public.classes;
CREATE POLICY "allow_public_read" ON public.classes FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "classes_select_auth" ON public.classes;
CREATE POLICY "classes_select_auth" ON public.classes FOR SELECT TO authenticated USING (true);

-- Students policies
DROP POLICY IF EXISTS "students_select_auth" ON public.students;
CREATE POLICY "students_select_auth" ON public.students FOR SELECT TO authenticated USING (true);

-- Attendance policies
DROP POLICY IF EXISTS "attendance_select_parent_or_teacher" ON public.attendance;
CREATE POLICY "attendance_select_parent_or_teacher" ON public.attendance
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = (SELECT public.current_auth_uid())
      AND (p.id = (SELECT parent_id FROM public.students s WHERE s.id = attendance.student_id))
    )
  );

-- Grades policies
DROP POLICY IF EXISTS "grades_select_parent_or_teacher" ON public.grades;
CREATE POLICY "grades_select_parent_or_teacher" ON public.grades
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = (SELECT public.current_auth_uid())
      AND (p.id = (SELECT parent_id FROM public.students s WHERE s.id = grades.student_id))
    )
  );

-- Fees policies
DROP POLICY IF EXISTS "fees_select_parent" ON public.fees;
CREATE POLICY "fees_select_parent" ON public.fees
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = (SELECT public.current_auth_uid())
      AND (p.id = (SELECT parent_id FROM public.students s WHERE s.id = fees.student_id))
    )
  );

-- ...existing code...