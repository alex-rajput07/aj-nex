import './globals.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'AJ School ERP',
  description: 'School ERP - Dashboard for Admin/Teacher/Student/Parent',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}