'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useOrders } from '../hooks/useOrders';
import Link from 'next/link';
import Image from 'next/image';

export default function OrdersPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { orders, isLoading, error } = useOrders();

    if (!session) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>
                <div className="text-center">
                    <i className="fas fa-user-lock text-6xl text-gray-400 mb-4"></i>
                    <p className="text-xl text-gray-600 mb-6">Please login to view your orders</p>
                    <button 
                        onClick={() => router.push('/login')}
                        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>
                <div className="flex justify-center items-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
                    <span className="ml-4 text-xl text-gray-600">Loading your orders...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                    <p className="text-xl text-red-600 mb-6">{error}</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>
                <div className="text-center">
                    <i className="fas fa-box text-6xl text-gray-400 mb-4"></i>
                    <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet</p>
                    <Link 
                        href="/product"
                        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition inline-block"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (isPaid: boolean, isDelivered: boolean) => {
        if (isDelivered) return 'text-green-600 bg-green-100';
        if (isPaid) return 'text-blue-600 bg-blue-100';
        return 'text-orange-600 bg-orange-100';
    };

    const getStatusText = (isPaid: boolean, isDelivered: boolean) => {
        if (isDelivered) return 'Delivered';
        if (isPaid) return 'Paid';
        return 'Pending';
    };

    return (
        <div className="container w-[90%] mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-10">My Orders</h1>
            
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b">
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Order ID</p>
                                    <p className="font-mono text-sm">{order._id}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600">Order Date</p>
                                    <p className="text-sm">{formatDate(order.createdAt)}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600">Payment Method</p>
                                    <p className="text-sm capitalize">{order.paymentMethodType}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600">Status</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.isPaid, order.isDelivered)}`}>
                                        {getStatusText(order.isPaid, order.isDelivered)}
                                    </span>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600">Total</p>
                                    <p className="text-lg font-bold text-green-600">
                                        EGP {order.totalOrderPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Order Items */}
                        <div className="p-6">
                            <h3 className="font-semibold mb-4">Items ({order.cartItems.length})</h3>
                            
                            <div className="space-y-4">
                                {order.cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={item.product.imageCover}
                                                alt={item.product.title}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-sm">
                                                {item.product.title}
                                            </h4>
                                            <p className="text-gray-500 text-xs">
                                                {item.product.brand.name} • {item.product.category.name}
                                            </p>
                                            <p className="text-sm">
                                                Qty: {item.count} × EGP {item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">
                                                EGP {(item.price * item.count).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Shipping Address */}
                            <div className="mt-6 pt-4 border-t">
                                <h4 className="font-semibold mb-2">Shipping Address</h4>
                                <div className="text-sm text-gray-600">
                                    <p>{order.shippingAddress.details}</p>
                                    <p>{order.shippingAddress.city}</p>
                                    <p>Phone: {order.shippingAddress.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}