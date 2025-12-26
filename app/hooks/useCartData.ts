'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getCart } from '../../API/getCart';
import { updateCartItem } from '../../API/updateCartItem';
import { removeFromCart } from '../../API/removeFromCart';
import { clearCart } from '../../API/clearCart';
import { useCartContext } from '../context/CartContext';
import { toast } from 'sonner';

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
    const { refreshCartCount, clearCartCount } = useCartContext();
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

    const updateItemCount = async (productId: string, newCount: number) => {
        if (!session?.accessToken) {
            setError('Please login first');
            return false;
        }

        if (newCount < 1) {
            toast.error('Quantity cannot be less than 1');
            return false;
        }

        try {
            const result = await updateCartItem(productId, newCount, session.accessToken as string);
            
            if (result.status === 'success') {
                setCartData(result.data);
                refreshCartCount(); // Update cart count in navbar
                toast.success('Cart updated successfully');
                return true;
            } else {
                toast.error('Failed to update cart');
                return false;
            }
        } catch (err) {
            toast.error('Error updating cart');
            console.error('Cart update error:', err);
            return false;
        }
    };

    const removeItem = async (productId: string) => {
        if (!session?.accessToken) {
            setError('Please login first');
            return false;
        }

        try {
            const result = await removeFromCart(productId, session.accessToken as string);
            
            if (result.status === 'success') {
                setCartData(result.data);
                refreshCartCount(); // Update cart count in navbar
                toast.success('Item removed from cart');
                return true;
            } else {
                toast.error('Failed to remove item from cart');
                return false;
            }
        } catch (err) {
            toast.error('Error removing item from cart');
            console.error('Cart remove error:', err);
            return false;
        }
    };

    const clearAllItems = async () => {
        if (!session?.accessToken) {
            setError('Please login first');
            return false;
        }

        try {
            const result = await clearCart(session.accessToken as string);
            
            if (result.message === 'success') {
                setCartData(null);
                clearCartCount(); // Clear cart count immediately
                toast.success('Cart cleared successfully');
                return true;
            } else {
                toast.error('Failed to clear cart');
                return false;
            }
        } catch (err) {
            toast.error('Error clearing cart');
            console.error('Cart clear error:', err);
            return false;
        }
    };

    return {
        cartData,
        isLoading,
        error,
        refetch: fetchCart,
        updateItemCount,
        removeItem,
        clearAllItems,
        clearError: () => setError(null)
    };
}