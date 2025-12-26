'use client';

import LiveSalesFeed from "../_components/LiveSalesFeed";
import PopularProducts from "../_components/PopularProducts";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Sales Analytics</h1>
                <div className="text-center">
                    <i className="fas fa-user-lock text-6xl text-gray-400 mb-4"></i>
                    <p className="text-xl text-gray-600 mb-6">Please login to view sales analytics</p>
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

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <section className="bg-white border-b">
                <div className="container w-[90%] mx-auto py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-black mb-4">
                            Sales Analytics Dashboard
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Real-time insights into sales performance, trending products, and customer activity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Analytics Content */}
            <section className="container w-[90%] mx-auto py-10">
                <div className="space-y-8">
                    {/* Popular Products */}
                    <div>
                        <PopularProducts />
                    </div>
                    
                    {/* Live Sales Feed */}
                    <div>
                        <LiveSalesFeed />
                    </div>
                </div>

                {/* Additional Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {/* Total Sales Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Sales Today</p>
                                <p className="text-2xl font-bold text-green-600">EGP 45,230</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-green-600">↗ +12.5% from yesterday</span>
                        </div>
                    </div>

                    {/* Orders Count Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Orders Today</p>
                                <p className="text-2xl font-bold text-blue-600">127</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <i className="fas fa-shopping-bag text-blue-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-blue-600">↗ +8.2% from yesterday</span>
                        </div>
                    </div>

                    {/* Active Users Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active Users</p>
                                <p className="text-2xl font-bold text-purple-600">1,234</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <i className="fas fa-users text-purple-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-sm text-purple-600">↗ +5.7% from yesterday</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}