'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getCart } from '../../API/getCart';

interface CartContextType {
    cartItemsCount: number;
    refreshCartCount: () => void;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCartCount = async () => {
        if (!session?.accessToken) {
            setCartItemsCount(0);
            return;
        }

        setIsLoading(true);
        try {
            const result = await getCart(session.accessToken as string);
            
            if (result.status === 'success' && result.data) {
                // Calculate total items count (sum of all quantities)
                const totalCount = result.data.products.reduce((total: number, item: any) => total + item.count, 0);
                setCartItemsCount(totalCount);
            } else {
                setCartItemsCount(0);
            }
        } catch (error) {
            console.error('Error fetching cart count:', error);
            setCartItemsCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshCartCount = () => {
        fetchCartCount();
    };

    useEffect(() => {
        if (session?.accessToken) {
            fetchCartCount();
        } else {
            setCartItemsCount(0);
        }
    }, [session?.accessToken]);

    return (
        <CartContext.Provider value={{ cartItemsCount, refreshCartCount, isLoading }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}