import React from 'react';
import { Users, School, TrendingUp } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">About AJ School ERP</h1>
      <p className="text-center text-gray-600 mb-12">An integrated, user-friendly, and efficient solution for modern educational institutions.</p>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <School size={48} className="text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700">To empower educational institutions with technology, simplifying administration and enhancing the learning experience for students, parents, and teachers.</p>
        </div>
        <div className="flex flex-col items-center">
          <Users size={48} className="text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">For Everyone</h2>
          <p className="text-gray-700">Designed with dedicated portals for every role: Administrators, Teachers, Students, and Parents, ensuring seamless communication and access to information.</p>
        </div>
        <div className="flex flex-col items-center">
          <TrendingUp size={48} className="text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Future Forward</h2>
          <p className="text-gray-700">We are constantly innovating, leveraging the latest in web technology to deliver a reliable, scalable, and future-proof ERP system.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;