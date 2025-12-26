'use client';

import { useAllOrders } from '../hooks/useAllOrders';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function PopularProducts() {
    const { data: session } = useSession();
    const { popularProducts, isLoading, error, usingMockData } = useAllOrders();

    // Show loading state only during initial fetch
    if (isLoading && popularProducts.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                    <i className="fas fa-fire text-gray-400 text-xl"></i>
                    <h2 className="text-xl font-bold">Trending Products</h2>
                </div>
                <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                    <p className="text-gray-500 mt-2">Loading trending products...</p>
                </div>
            </div>
        );
    }

    // Always show the component with data (mock or real)
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <i className="fas fa-fire text-orange-500 text-xl"></i>
                <h2 className="text-xl font-bold">Trending Products</h2>
                <span className="text-sm text-gray-500">
                    {usingMockData ? 'Demo rankings' : 'Based on real sales data'}
                </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
                {popularProducts.map((product, index) => (
                    <div 
                        key={product.productId} 
                        className="relative bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
                    >
                        {/* Rank Badge */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                            {index + 1}
                        </div>
                        
                        {/* Hot Badge for top 3 */}
                        {index < 3 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                🔥 HOT
                            </div>
                        )}
                        
                        <Link href={`/product/${product.productId}`} className="block">
                            <div className="relative w-full h-48 mb-4">
                                <Image
                                    src={product.imageCover}
                                    alt={product.title}
                                    fill
                                    className="object-contain rounded-md group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            
                            <h3 className="font-semibold text-base mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {product.title}
                            </h3>
                            
                            <div className="space-y-1">
                                <p className="text-sm text-gray-600 mb-2">
                                    {product.brand} • {product.category}
                                </p>
                                
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1">
                                        <i className="fas fa-shopping-bag text-green-600 text-sm"></i>
                                        <span className="text-sm font-medium text-green-600">
                                            {product.totalSold} sold
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                        <i className="fas fa-coins text-yellow-600 text-sm"></i>
                                        <span className="text-sm font-medium text-yellow-600">
                                            EGP {product.totalRevenue.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Progress bar showing popularity */}
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                    <div 
                                        className="bg-linear-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                                        style={{ 
                                            width: `${Math.min((product.totalSold / popularProducts[0].totalSold) * 100, 100)}%` 
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    {usingMockData ? (
                        <>Demo rankings • Will update with real sales data when available</>
                    ) : (
                        <>Rankings based on total sales • Updated in real-time</>
                    )}
                </p>
            </div>
        </div>
    );
}