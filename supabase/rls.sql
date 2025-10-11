CREATE POLICY parent_select ON students
FOR SELECT
USING (parent_id = auth.uid());

CREATE POLICY teacher_select ON attendance
FOR SELECT
USING (class_id IN (SELECT class_id FROM students WHERE teacher_id = auth.uid()));

CREATE POLICY teacher_insert_update ON attendance
FOR INSERT, UPDATE
USING (class_id IN (SELECT class_id FROM students WHERE teacher_id = auth.uid()));

CREATE POLICY principal_manager_select ON grades
FOR SELECT
USING (true);

CREATE POLICY principal_manager_update ON grades
FOR UPDATE
USING (true);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;