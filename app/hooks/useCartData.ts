'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getCart } from '../../API/getCart';

interface CartItem {
    _id: string;
    count: number;
    price: number;
    product: {
        _id: string;
        title: string;
        imageCover: string;
        category: {
            name: string;
        };
        brand: {
            name: string;
        };
    };
}

interface CartData {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    totalCartPrice: number;
    __v: number;
}

export function useCartData() {
    const { data: session } = useSession();
    const [cartData, setCartData] = useState<CartData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = async () => {
        if (!session?.accessToken) {
            setError('Please login first');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await getCart(session.accessToken as string);
            
            if (result.status === 'success') {
                setCartData(result.data);
            } else {
                setError('Failed to fetch cart data');
            }
        } catch (err) {
            setError('Error fetching cart data');
            console.error('Cart fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (session?.accessToken) {
            fetchCart();
        }
    }, [session?.accessToken]);

    return {
        cartData,
        isLoading,
        error,
        refetch: fetchCart,
        clearError: () => setError(null)
    };
}