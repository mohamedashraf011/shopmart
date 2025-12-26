'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getAllOrders } from '../../API/getAllOrders';
import { mockRecentOrders, mockPopularProducts } from '../data/mockData';

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

interface PopularProduct {
    productId: string;
    title: string;
    imageCover: string;
    brand: string;
    category: string;
    totalSold: number;
    totalRevenue: number;
}

export function useAllOrders() {
    const { data: session } = useSession();
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [recentOrders, setRecentOrders] = useState<Order[]>(mockRecentOrders);
    const [popularProducts, setPopularProducts] = useState<PopularProduct[]>(mockPopularProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usingMockData, setUsingMockData] = useState(true);

    const processOrdersData = (orders: Order[]) => {
        // Get recent orders (last 10)
        const recent = orders
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10);
        setRecentOrders(recent);

        // Calculate popular products
        const productStats: { [key: string]: PopularProduct } = {};

        orders.forEach(order => {
            order.cartItems.forEach(item => {
                const productId = item.product._id;
                
                if (!productStats[productId]) {
                    productStats[productId] = {
                        productId,
                        title: item.product.title,
                        imageCover: item.product.imageCover,
                        brand: item.product.brand.name,
                        category: item.product.category.name,
                        totalSold: 0,
                        totalRevenue: 0
                    };
                }
                
                productStats[productId].totalSold += item.count;
                productStats[productId].totalRevenue += item.price * item.count;
            });
        });

        // Sort by total sold and get top 6
        const popular = Object.values(productStats)
            .sort((a, b) => b.totalSold - a.totalSold)
            .slice(0, 6);
        
        setPopularProducts(popular);
    };

    const fetchAllOrders = async () => {
        if (!session?.accessToken) {
            console.log('No session token available - using mock data');
            return;
        }

        console.log('Fetching all orders with token:', session.accessToken.substring(0, 20) + '...');
        setIsLoading(true);
        setError(null);

        try {
            const result = await getAllOrders(session.accessToken as string);
            console.log('API Response:', result);
            
            if (result && Array.isArray(result) && result.length > 0) {
                console.log('Processing', result.length, 'real orders');
                setAllOrders(result);
                processOrdersData(result);
                setUsingMockData(false);
            } else if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
                console.log('Processing', result.data.length, 'real orders from result.data');
                setAllOrders(result.data);
                processOrdersData(result.data);
                setUsingMockData(false);
            } else {
                console.log('No real orders found - keeping mock data');
                // Keep mock data if no real data available
            }
        } catch (err) {
            console.error('All orders fetch error:', err);
            console.log('API failed - keeping mock data');
            setError(null); // Don't show error, just keep mock data
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (session?.accessToken) {
            // Try to fetch real data, but don't clear mock data if it fails
            fetchAllOrders();
            
            // Refresh data every 30 seconds for live updates (only if we have real data)
            const interval = setInterval(() => {
                if (!usingMockData) {
                    fetchAllOrders();
                }
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [session?.accessToken, usingMockData]);

    return {
        allOrders,
        recentOrders,
        popularProducts,
        isLoading,
        error,
        usingMockData,
        refetch: fetchAllOrders,
        clearError: () => setError(null)
    };
}