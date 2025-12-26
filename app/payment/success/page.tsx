'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartContext } from '../../context/CartContext';
import { toast } from 'sonner';

export default function PaymentSuccessPage() {
    const { clearCartCount } = useCartContext();
    const router = useRouter();

    useEffect(() => {
        // Clear cart count since payment was successful and cart should be empty
        clearCartCount();
        
        // Show success message and redirect to orders
        toast.success('Payment successful! Redirecting to your orders...');
        
        const timer = setTimeout(() => {
            router.push('/orders');
        }, 2000);

        return () => clearTimeout(timer);
    }, [clearCartCount, router]);

    return (
        <div className="container w-[90%] mx-auto py-20 text-center">
            <div className="max-w-md mx-auto">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-check text-3xl text-green-600"></i>
                </div>
                
                <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                
                <p className="text-gray-600 mb-4">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-gray-500">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Redirecting to your orders...</span>
                </div>
            </div>
        </div>
    );
}