// app/layout.tsx
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'AJ School ERP',
  description: 'School ERP - Dashboard for Admin/Teacher/Student/Parent',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ fontFamily: 'system-ui, sans-serif' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
