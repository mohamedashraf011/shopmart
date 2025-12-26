'use client';

import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
    productId: string;
    className?: string;
    children?: React.ReactNode;
}

export default function AddToCartButton({ 
    productId, 
    className = '', 
    children
}: AddToCartButtonProps) {
    const { data: session } = useSession();
    const { addToCart, isLoading } = useCart();
    const router = useRouter();

    const handleClick = async () => {
        if (!session) {
            router.push('/login');
            return;
        }

        await addToCart(productId);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? (
                <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {children?.toString().includes('Add To Cart') ? 'Adding...' : 'Adding...'}
                </>
            ) : (
                children || 'Add to Cart'
            )}
        </button>
    );
}