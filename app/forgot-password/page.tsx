// app/forgot-password/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import FeedbackToast from '@/components/FeedbackToast';
import { School, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setFeedback(null);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setFeedback({ message: error.message, type: 'error' });
    } else {
      setFeedback({ message: 'Password reset link sent! Please check your email.', type: 'success' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 p-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full mb-4">
              <School className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
            <p className="text-gray-500 mt-1">Enter your email to reset your password</p>
          </div>

          {feedback && <FeedbackToast message={feedback.message} type={feedback.type} />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Remember your password?{' '}
              <Link href="/login">
                <span className="font-medium text-blue-600 hover:text-blue-500">Log in</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
