'use client';
import React from 'react';
import Lottie from 'react-lottie-player';

interface FeedbackToastProps {
  message: string;
  type: 'success' | 'error';
}

const FeedbackToast: React.FC<FeedbackToastProps> = ({ message, type }) => {
  return (
    <div className={`flex items-center p-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {type === 'success' && <Lottie
        loop={false}
        play
        src="/lottie/checkmark.json"
        style={{ width: 40, height: 40, marginRight: '1rem' }}
      />}
      <span className="text-white">{message}</span>
    </div>
  );
};

export default FeedbackToast;