// app/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, BookOpen, Briefcase } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

const featureCards = [
  { icon: <Users className="w-8 h-8 mb-4 text-primary-foreground" />, title: "Unified Platform", description: "One portal for administrators, teachers, students, and parents." },
  { icon: <BookOpen className="w-8 h-8 mb-4 text-primary-foreground" />, title: "Academic Excellence", description: "Manage grades, attendance, and schedules with ease." },
  { icon: <Briefcase className="w-8 h-8 mb-4 text-primary-foreground" />, title: "Streamlined Administration", description: "Automate admissions, fee collection, and HR processes." },
];

const roleLogin = [
    { role: 'Admin', href: '/login?role=admin' },
    { role: 'Teacher', href: '/login?role=teacher' },
    { role: 'Student', href: '/login?role=student' },
    { role: 'Parent', href: '/login?role=parent' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative text-center py-20 md:py-32 lg:py-40 bg-secondary"
        >
            <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: 'url(/school-hero.jpg)', opacity: 0.1 }}
            ></div>
          <div className="container mx-auto px-4 relative">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              The Future of School Management is Here
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
            >
              AJ School ERP provides a seamless, integrated platform to connect your entire school community.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
                {roleLogin.map(r => (
                    <Link key={r.role} href={r.href}>
                        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-semibold transition-transform transform hover:scale-105">
                            Login as {r.role}
                        </button>
                    </Link>
                ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose AJ School ERP?</h2>
              <p className="mt-2 text-lg text-muted-foreground">Everything you need to run your institution efficiently.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-8 rounded-xl shadow-sm border border-border text-center"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-card-foreground mt-2">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Us</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        AJ School ERP was founded with a singular mission: to empower educational institutions with technology that is powerful, affordable, and easy to use. We believe in creating connected communities where students, teachers, and parents can thrive.
                    </p>
                    <Link href="/about" className="mt-6 inline-flex items-center text-primary-foreground font-semibold hover:underline">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-80 bg-cover bg-center rounded-lg shadow-xl"
                    style={{backgroundImage: 'url(/about-us.jpg)'}}
                >
                </motion.div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
