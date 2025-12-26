'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PaymentCancelPage() {
    const router = useRouter();

    useEffect(() => {
        // Show cancel message and redirect to cart
        toast.error('Payment was cancelled. Redirecting to your cart...');
        
        const timer = setTimeout(() => {
            router.push('/cart');
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="container w-[90%] mx-auto py-20 text-center">
            <div className="max-w-md mx-auto">
                <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-times text-3xl text-red-600"></i>
                </div>
                
                <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
                
                <p className="text-gray-600 mb-4">
                    Your payment was cancelled. No charges were made to your account.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-gray-500">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Redirecting to your cart...</span>
                </div>
            </div>
        </div>
    );
}