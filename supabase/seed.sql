INSERT INTO profiles (id, name, role) VALUES
(1, 'Admin User', 'ADMIN'),
(2, 'Manager User', 'MANAGER'),
(3, 'Principal User', 'PRINCIPAL'),
(4, 'Teacher User', 'TEACHER'),
(5, 'Parent User', 'PARENT');

INSERT INTO students (id, name, parent_id) VALUES
(1, 'Student One', 5),
(2, 'Student Two', 5),
(3, 'Student Three', 5),
(4, 'Student Four', 5),
(5, 'Student Five', 5),
(6, 'Student Six', 5),
(7, 'Student Seven', 5),
(8, 'Student Eight', 5),
(9, 'Student Nine', 5),
(10, 'Student Ten', 5),
(11, 'Student Eleven', 5),
(12, 'Student Twelve', 5),
(13, 'Student Thirteen', 5),
(14, 'Student Fourteen', 5),
(15, 'Student Fifteen', 5),
(16, 'Student Sixteen', 5),
(17, 'Student Seventeen', 5),
(18, 'Student Eighteen', 5),
(19, 'Student Nineteen', 5),
(20, 'Student Twenty', 5);

INSERT INTO classes (id, name) VALUES
(1, 'Class 1'),
(2, 'Class 2'),
(3, 'Class 3'),
(4, 'Class 4'),
(5, 'Class 5');

INSERT INTO attendance (id, student_id, date, status) VALUES
(1, 1, '2023-10-01', 'present'),
(2, 1, '2023-10-02', 'absent'),
(3, 2, '2023-10-01', 'present'),
(4, 2, '2023-10-02', 'present'),
(5, 3, '2023-10-01', 'absent'),
(6, 3, '2023-10-02', 'present'),
(7, 4, '2023-10-01', 'present'),
(8, 4, '2023-10-02', 'present'),
(9, 5, '2023-10-01', 'absent'),
(10, 5, '2023-10-02', 'present');

INSERT INTO grades (id, student_id, class_id, subject, grade) VALUES
(1, 1, 1, 'Mathematics', 'A'),
(2, 1, 1, 'Science', 'B'),
(3, 2, 1, 'Mathematics', 'C'),
(4, 2, 1, 'Science', 'A'),
(5, 3, 1, 'Mathematics', 'B'),
(6, 3, 1, 'Science', 'B'),
(7, 4, 1, 'Mathematics', 'A'),
(8, 4, 1, 'Science', 'C'),
(9, 5, 1, 'Mathematics', 'D'),
(10, 5, 1, 'Science', 'B');

INSERT INTO fees (id, student_id, amount, status) VALUES
(1, 1, 1000, 'paid'),
(2, 2, 1000, 'pending'),
(3, 3, 1000, 'defaulter'),
(4, 4, 1000, 'paid'),
(5, 5, 1000, 'pending');

INSERT INTO assets (id, name, quantity) VALUES
(1, 'Projector', 5),
(2, 'Laptop', 10),
(3, 'Whiteboard', 15),
(4, 'Desk', 20),
(5, 'Chair', 25);

INSERT INTO messages (id, sender_id, receiver_id, content) VALUES
(1, 1, 5, 'Welcome to the school!'),
(2, 5, 1, 'Thank you for the warm welcome.'),
(3, 2, 5, 'Can I get an update on my child’s performance?'),
(4, 5, 2, 'Sure! I will send you the report shortly.');