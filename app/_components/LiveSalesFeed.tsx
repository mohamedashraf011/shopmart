'use client';

import { useAllOrders } from '../hooks/useAllOrders';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function LiveSalesFeed() {
    const { data: session } = useSession();
    const { recentOrders, isLoading, error, usingMockData } = useAllOrders();

    if (isLoading && recentOrders.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                    <h2 className="text-xl font-bold">Live Sales Feed</h2>
                </div>
                <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                    <p className="text-gray-500 mt-2">Loading live sales...</p>
                </div>
            </div>
        );
    }

    const formatTimeAgo = (dateString: string) => {
        const now = new Date();
        const orderDate = new Date(dateString);
        const diffInMinutes = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const getRandomCity = () => {
        const cities = ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Hurghada', 'Luxor', 'Aswan'];
        return cities[Math.floor(Math.random() * cities.length)];
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${usingMockData ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <h2 className="text-xl font-bold">Live Sales Feed</h2>
                <span className="text-sm text-gray-500">
                    {usingMockData ? 'Demo data' : 'Real-time purchases'}
                </span>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
                {recentOrders.slice(0, 8).map((order, index) => {
                    const firstItem = order.cartItems[0];
                    const itemCount = order.cartItems.length;
                    
                    return (
                        <div 
                            key={order._id} 
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            style={{ 
                                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` 
                            }}
                        >
                            <div className="relative w-12 h-12 shrink-0">
                                <Image
                                    src={firstItem.product.imageCover}
                                    alt={firstItem.product.title}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            
                            <div className="grow">
                                <p className="text-sm">
                                    <span className="font-medium">Someone</span> in{' '}
                                    <span className="font-medium text-blue-600">{getRandomCity()}</span>{' '}
                                    bought{' '}
                                    <span className="font-medium">{firstItem.product.title.slice(0, 30)}...</span>
                                    {itemCount > 1 && (
                                        <span className="text-gray-500"> +{itemCount - 1} more items</span>
                                    )}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">
                                        {formatTimeAgo(order.createdAt)}
                                    </span>
                                    <span className="text-xs font-medium text-green-600">
                                        EGP {order.totalOrderPrice.toFixed(0)}
                                    </span>
                                    {order.isPaid && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                            Paid
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    {usingMockData ? (
                        <>Demo data • Will update with real orders when available</>
                    ) : (
                        <>Updates every 30 seconds • {recentOrders.length} recent orders</>
                    )}
                </p>
            </div>
            
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}