'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartData } from '../hooks/useCartData';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { cartData, isLoading, error, updateItemCount, removeItem, clearAllItems } = useCartData();

    if (!session) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="text-center">
                    <i className="fas fa-user-lock text-6xl text-gray-400 mb-4"></i>
                    <p className="text-xl text-gray-600 mb-6">Please login to view your cart</p>
                    <button 
                        onClick={() => router.push('/login')}
                        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition cursor-pointer"
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
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="flex justify-center items-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
                    <span className="ml-4 text-xl text-gray-600">Loading your cart...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                    <p className="text-xl text-red-600 mb-6">{error}</p>
                </div>
            </div>
        );
    }

    if (!cartData || cartData.products.length === 0) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="text-center">
                    <i className="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
                    <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
                    <Link 
                        href="/product"
                        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition inline-block"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }


    const totalItemsCount = cartData.products.reduce((total, item) => total + item.count, 0);

    return (
        <div className="container w-[90%] mx-auto py-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
                <button 
                    onClick={clearAllItems}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
                >
                    <i className="fas fa-trash"></i>
                    Clear Cart
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {cartData.products.map((item) => (
                            <div key={item._id} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <Image
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                
                                <div className="grow">
                                    <h3 className="font-semibold text-lg mb-1">
                                        {item.product.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {item.product.brand.name} • {item.product.category.name}
                                    </p>
                                    <p className="text-lg font-bold text-green-600 mt-2">
                                        EGP {item.price.toFixed(2)}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                                        <button 
                                            onClick={() => updateItemCount(item.product._id, item.count - 1)}
                                            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                                            disabled={item.count <= 1}
                                        >
                                            <i className="fas fa-minus text-sm"></i>
                                        </button>
                                        <span className="font-semibold min-w-[20] text-center">
                                            {item.count}
                                        </span>
                                        <button 
                                            onClick={() => updateItemCount(item.product._id, item.count + 1)}
                                            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                                        >
                                            <i className="fas fa-plus text-sm"></i>
                                        </button>
                                    </div>
                                    
                                    <button 
                                        onClick={() => removeItem(item.product._id)}
                                        className="w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center cursor-pointer"
                                    >
                                        <i className="fas fa-trash text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span>Items ({totalItemsCount})</span>
                                <span>EGP {cartData.totalCartPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <hr />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>EGP {cartData.totalCartPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <Link 
                            href="/checkout"
                            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-semibold text-center block"
                        >
                            Proceed to Checkout
                        </Link>
                        
                        <Link 
                            href="/product"
                            className="block text-center text-gray-600 hover:text-black transition mt-4 cursor-pointer"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}