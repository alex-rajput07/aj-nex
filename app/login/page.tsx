// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  // Mock credentials (replace with real API later)
  const credentials: { [key: string]: any } = {
    admin: { username: 'admin', password: 'admin123' },
    teacher: { username: 'teacher', password: 'teacher123' },
    student: { username: 'student', password: 'student123' },
    parent: { username: 'parent', password: 'parent123' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');

    if (!username || !password) {
      setMsg('Please fill both fields.');
      return;
    }

    const user = credentials[role];
    if (!user) {
      setMsg('Invalid role selected.');
      return;
    }

    if (username === user.username && password === user.password) {
      // Save a small token to sessionStorage on client — safe because inside event handler / client component
      try {
        sessionStorage.setItem('erp_role', role);
      } catch (err) {
        // sessionStorage may not be available in some contexts; ignore safely
      }
      // navigate to role dashboard
      router.push(`/${role}-dashboard`);
    } else {
      setMsg('Invalid credentials.');
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 520, margin: '24px auto' }}>
      <h1>Login — AJ ERP</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: 8 }}>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
          </select>
        </label>

        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </label>

        <button type="submit" style={{ padding: 10, background: '#111827', color: '#fff', borderRadius: 6 }}>Login</button>
        {msg && <div style={{ color: 'red' }}>{msg}</div>}
      </form>

      <div style={{ marginTop: 20 }}>
        <strong>Test accounts:</strong>
        <ul>
          <li>admin / admin123</li>
          <li>teacher / teacher123</li>
          <li>student / student123</li>
          <li>parent / parent123</li>
        </ul>
      </div>
    </div>
  );
}