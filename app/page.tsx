// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const features = [
  "Role-Based Dashboards",
  "Student & Staff Management",
  "Attendance Tracking",
  "Grading & Reports",
  "Fee Management",
  "Communication Tools"
];

const testimonials = [
  { name: "Principal Sharma", school: "Greenwood High", quote: "AJ ERP has streamlined our operations like never before. It's a one-stop solution for our administrative needs." },
  { name: "Mrs. Davis", school: "Oakridge International", quote: "As a teacher, the grading and attendance modules are incredibly intuitive. It saves me hours every week." },
  { name: "Mr. Chen", school: "Parent", quote: "I can finally track my child's progress in real-time. The parent portal is a fantastic feature." }
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-extrabold text-gray-800"
          >
            Empowering Schools with Smart Management
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            AJ ERP is a complete, cloud-based school management system designed to automate your school’s diverse operations.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8"
          >
            <Link href="/login">
              <span className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300">
                Get Started
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Features Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <Check className="text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-700 ml-3">{feature}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-bold text-gray-800">- {testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.school}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (brief) */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About AJ ERP</h2>
          <p className="text-lg text-gray-600">
            Founded by Ajeet Singh (AJ), our mission is to provide an affordable, powerful, and user-friendly ERP system for educational institutions of all sizes. We believe in the power of technology to transform education.
          </p>
          <Link href="/about">
            <span className="mt-6 inline-block text-blue-600 font-semibold hover:underline">
              Learn more about us
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}