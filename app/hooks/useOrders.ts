'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getUserOrders } from '../../API/getUserOrders';
import { jwtDecode } from 'jwt-decode';

interface OrderItem {
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

interface Order {
    _id: string;
    cartItems: OrderItem[];
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    shippingAddress: {
        details: string;
        phone: string;
        city: string;
    };
}

interface DecodedToken {
    id: string;
}

export function useOrders() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        if (!session?.accessToken) {
            setError('Please login first');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Decode token to get user ID
            const decoded: DecodedToken = jwtDecode(session.accessToken as string);
            const userId = decoded.id;

            const result = await getUserOrders(userId, session.accessToken as string);
            
            if (result && Array.isArray(result)) {
                setOrders(result);
            } else {
                setOrders([]);
            }
        } catch (err) {
            setError('Error fetching orders');
            console.error('Orders fetch error:', err);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (session?.accessToken) {
            fetchOrders();
        }
    }, [session?.accessToken]);

    return {
        orders,
        isLoading,
        error,
        refetch: fetchOrders,
        clearError: () => setError(null)
    };
}