'use client';
import React from 'react';
import Lottie from 'react-lottie-player';

const LottieLoading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Lottie
                loop
                src="/lottie/loading.json"
                play
                style={{ width: 150, height: 150 }}
            />
        </div>
    );
};

export default LottieLoading;