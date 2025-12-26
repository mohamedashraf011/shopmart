'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAddresses } from '../hooks/useAddresses';

interface AddressForm {
    name: string;
    details: string;
    phone: string;
    city: string;
}

export default function AddressesPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { addresses, isLoading, error, addNewAddress, deleteAddress } = useAddresses();
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<AddressForm>({
        name: '',
        details: '',
        phone: '',
        city: ''
    });

    if (!session) {
        return (
            <div className="container w-[90%] mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-8">My Addresses</h1>
                <div className="text-center">
                    <i className="fas fa-user-lock text-6xl text-gray-400 mb-4"></i>
                    <p className="text-xl text-gray-600 mb-6">Please login to manage your addresses</p>
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.details || !formData.phone || !formData.city) {
            return;
        }

        setIsSubmitting(true);
        const success = await addNewAddress(formData);
        
        if (success) {
            setFormData({ name: '', details: '', phone: '', city: '' });
            setShowAddForm(false);
        }
        
        setIsSubmitting(false);
    };

    const handleDelete = async (addressId: string) => {
        if (confirm('Are you sure you want to delete this address?')) {
            await deleteAddress(addressId);
        }
    };

    return (
        <div className="container w-[90%] mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Addresses</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i>
                    Add New Address
                </button>
            </div>

            {/* Add Address Form */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">Add New Address</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Home, Work, etc."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="01010700700"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City *
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="Cairo"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address Details *
                            </label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleInputChange}
                                placeholder="Enter your full address details"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                rows={3}
                                required
                            />
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Address'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                    <p className="text-gray-500 mt-2">Loading addresses...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-8">
                    <i className="fas fa-exclamation-triangle text-2xl text-red-400"></i>
                    <p className="text-red-500 mt-2">{error}</p>
                </div>
            )}

            {/* Addresses List */}
            {!isLoading && !error && (
                <div className="space-y-4">
                    {addresses.length === 0 ? (
                        <div className="text-center py-12">
                            <i className="fas fa-map-marker-alt text-6xl text-gray-400 mb-4"></i>
                            <p className="text-xl text-gray-600 mb-4">No addresses found</p>
                            <p className="text-gray-500">Add your first address to get started</p>
                        </div>
                    ) : (
                        addresses.map((address) => (
                            <div key={address._id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <i className="fas fa-map-marker-alt text-blue-600"></i>
                                            <h3 className="text-lg font-semibold">{address.name}</h3>
                                        </div>
                                        
                                        <p className="text-gray-700 mb-2">{address.details}</p>
                                        
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <i className="fas fa-city"></i>
                                                <span>{address.city}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <i className="fas fa-phone"></i>
                                                <span>{address.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleDelete(address._id)}
                                        className="text-red-500 hover:text-red-700 transition p-2"
                                        title="Delete Address"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}