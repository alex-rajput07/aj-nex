CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('ADMIN', 'MANAGER', 'PRINCIPAL', 'TEACHER', 'PARENT')) NOT NULL,
    staff_id INTEGER,
    student_id INTEGER
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class_id INTEGER REFERENCES classes(id),
    parent_id INTEGER REFERENCES profiles(id),
    date_of_birth DATE,
    gender VARCHAR(10)
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    section VARCHAR(10)
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    date DATE NOT NULL,
    status VARCHAR(10) CHECK (status IN ('PRESENT', 'ABSENT'))
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    subject VARCHAR(50) NOT NULL,
    grade VARCHAR(2) NOT NULL
);

CREATE TABLE fees (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(10) CHECK (status IN ('paid', 'pending', 'defaulter')),
    due_date DATE
);

CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES profiles(id),
    receiver_id INTEGER REFERENCES profiles(id),
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);