'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartData } from '../hooks/useCartData';
import { useCartContext } from '../context/CartContext';
import { createCashOrder } from '../../API/createCashOrder';
import { createOnlineOrder } from '../../API/createOnlineOrder';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

interface ShippingForm {
    details: string;
    phone: string;
    city: string;
}

export default function CheckoutPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { cartData, isLoading: cartLoading } = useCartData();
    const { refreshCartCount, clearCartCount } = useCartContext();
    
    const [shippingForm, setShippingForm] = useState<ShippingForm>({
        details: '',
        phone: '',
        city: ''
    });
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');

    if (!session) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="text-center">
                    <i className="fas fa-user-lock text-6xl text-gray-400 mb-4"></i>
                    <p className="text-xl text-gray-600 mb-6">Please login to proceed with checkout</p>
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

    if (cartLoading) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="flex justify-center items-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
                    <span className="ml-4 text-xl text-gray-600">Loading checkout...</span>
                </div>
            </div>
        );
    }

    if (!cartData || cartData.products.length === 0) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShippingForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!shippingForm.details || !shippingForm.phone || !shippingForm.city) {
            toast.error('Please fill in all shipping details');
            return;
        }

        setIsProcessing(true);

        try {
            if (paymentMethod === 'cash') {
                const result = await createCashOrder(cartData._id, shippingForm, session.accessToken as string);
                
                if (result.status === 'success') {
                    toast.success('Order placed successfully!');
                    clearCartCount();
                    setTimeout(() => {
                        router.push('/orders');
                    }, 1000);
                } else {
                    toast.error('Failed to place order');
                }
            } else {
                const baseUrl = window.location.origin;
                const successUrl = `${baseUrl}/orders?payment=success`;
                const cancelUrl = `${baseUrl}/payment/cancel`;
                
                const result = await createOnlineOrder(cartData._id, shippingForm, session.accessToken as string, successUrl, cancelUrl);
                
                if (result.status === 'success' && result.session?.url) {
                    toast.success('Redirecting to payment...');
                    window.location.href = result.session.url;
                } else {
                    toast.error('Failed to create payment session');
                }
            }
        } catch (error) {
            toast.error('Error processing order');
            console.error('Checkout error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const totalItemsCount = cartData.products.reduce((total, item) => total + item.count, 0);

    return (
        <div className="container w-[90%] mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="order-2 lg:order-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            {cartData.products.map((item) => (
                                <div key={item._id} className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 shrink-0">
                                        <Image
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    
                                    <div className="grow">
                                        <h3 className="font-semibold text-sm">
                                            {item.product.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs">
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
                        
                        <hr className="mb-4" />
                        
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Items ({totalItemsCount})</span>
                                <span>EGP {cartData.totalCartPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>EGP {cartData.totalCartPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Checkout Form */}
                <div className="order-1 lg:order-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Details *
                                </label>
                                <textarea
                                    name="details"
                                    value={shippingForm.details}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full address details"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    rows={3}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={shippingForm.phone}
                                    onChange={handleInputChange}
                                    placeholder="01010800921"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingForm.city}
                                    onChange={handleInputChange}
                                    placeholder="Cairo"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                            
                            <div className="space-y-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={paymentMethod === 'cash'}
                                        onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'online')}
                                        className="mr-3"
                                    />
                                    <div className="flex items-center">
                                        <i className="fas fa-money-bill-wave text-green-600 mr-3"></i>
                                        <div>
                                            <p className="font-medium">Cash on Delivery</p>
                                            <p className="text-sm text-gray-500">Pay when you receive your order</p>
                                        </div>
                                    </div>
                                </label>
                                
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="online"
                                        checked={paymentMethod === 'online'}
                                        onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'online')}
                                        className="mr-3"
                                    />
                                    <div className="flex items-center">
                                        <i className="fas fa-credit-card text-blue-600 mr-3"></i>
                                        <div>
                                            <p className="font-medium">Online Payment</p>
                                            <p className="text-sm text-gray-500">Pay securely with credit/debit card</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Processing...
                                </span>
                            ) : (
                                `Place Order - EGP ${cartData.totalCartPrice.toFixed(2)}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}