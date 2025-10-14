// app/page.tsx
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28 }}>AJ School ERP</h1>
      <p>Welcome to the school ERP. Click below to go to the Login page.</p>
      <div style={{ marginTop: 16 }}>
        <Link href="/login" style={{ padding: 10, background: '#2563eb', color: '#fff', borderRadius: 6 }}>Go to Login</Link>
      </div>

      <section style={{ marginTop: 28 }}>
        <h2>Quick Info</h2>
        <ul>
          <li>Roles supported: admin, teacher, student, parent</li>
          <li>Login uses mock credentials locally (see README)</li>
        </ul>
      </section>
    </main>
  );
}
