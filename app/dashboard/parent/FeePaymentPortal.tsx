'use client';
import React, { useEffect, useState } from 'react';
import { createClientSupabaseClient } from '@/utils/supabase/client';
import LottieLoading from '@/components/LottieLoading';
import FeedbackToast from '@/components/FeedbackToast';

interface Fee {
  id: number;
  description: string;
  amount: number;
}

const FeePaymentPortal = () => {
    const supabase = createClientSupabaseClient();
    const [fees, setFees] = useState<Fee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        const fetchFees = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('fees')
                    .select('*')
                    .eq('parent_id', user.id);

                if (error) {
                    setError(error.message);
                } else {
                    setFees(data);
                }
            }
            setLoading(false);
        };
        fetchFees();
    }, []);

    const handlePayment = async (feeId: number) => {
        // Re-fetch fees to ensure data is fresh before update
        const fetchFees = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data, error } = await supabase.from('fees').select('*').eq('parent_id', user.id);
            if (!error) setFees(data);
        };

        const { error } = await supabase
            .from('fees')
            .update({ status: 'paid' })
            .eq('id', feeId);

        if (error) {
            setError(error.message);
        } else {
            setPaymentSuccess(true);
            setTimeout(() => setPaymentSuccess(false), 3000);
            // Refresh fees after payment to show updated status
            fetchFees();
        }
    };

    if (loading) return <LottieLoading />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Fee Payment Portal</h1>
            <ul className="mt-4">
                {fees.map((fee) => (
                    <li key={fee.id} className="flex justify-between items-center border-b py-2">
                        <span>{fee.description} - ${fee.amount}</span>
                        <button
                            onClick={() => handlePayment(fee.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Pay Now
                        </button>
                    </li>
                ))}
            </ul>
            {paymentSuccess && <FeedbackToast message="Payment Successful!" type="success" />}
        </div>
    );
};

export default FeePaymentPortal;