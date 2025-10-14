// app/reset-password/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import FeedbackToast from '@/components/FeedbackToast';
import { School, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      const exchangeCodeForSession = async () => {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setFeedback({ message: 'Invalid or expired reset link.', type: 'error' });
        }
        setIsValidating(false);
      };
      exchangeCodeForSession();
    } else {
        setFeedback({ message: 'No reset token found.', type: 'error' });
        setIsValidating(false);
    }
  }, [code, supabase.auth]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setFeedback(null);
    const { error } = await supabase.auth.updateUser({ password: data.password });

    if (error) {
      setFeedback({ message: error.message, type: 'error' });
    } else {
      setFeedback({ message: 'Password updated successfully! Redirecting to login...', type: 'success' });
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  if (isValidating) {
      return <div className="min-h-screen flex items-center justify-center"><p>Validating link...</p></div>
  }

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
            <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
            <p className="text-gray-500 mt-1">Enter your new password</p>
          </div>

          {feedback && <FeedbackToast message={feedback.message} type={feedback.type} />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('password')}
                type="password"
                placeholder="New Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm New Password"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isValidating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
