'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getUserAddresses } from '../../API/getUserAddresses';
import { addAddress } from '../../API/addAddress';
import { removeAddress } from '../../API/removeAddress';
import { getSpecificAddress } from '../../API/getSpecificAddress';
import { toast } from 'sonner';

interface Address {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

interface AddressData {
    name: string;
    details: string;
    phone: string;
    city: string;
}

export function useAddresses() {
    const { data: session } = useSession();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAddresses = async () => {
        if (!session?.accessToken) {
            setError('Please login first');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await getUserAddresses(session.accessToken as string);
            
            if (result.status === 'success' && result.data) {
                setAddresses(result.data);
            } else {
                setAddresses([]);
            }
        } catch (err) {
            setError('Error fetching addresses');
            console.error('Addresses fetch error:', err);
            setAddresses([]);
        } finally {
            setIsLoading(false);
        }
    };

    const addNewAddress = async (addressData: AddressData) => {
        if (!session?.accessToken) {
            toast.error('Please login first');
            return false;
        }

        try {
            const result = await addAddress(addressData, session.accessToken as string);
            
            if (result.status === 'success') {
                toast.success('Address added successfully!');
                fetchAddresses(); // Refresh the list
                return true;
            } else {
                toast.error('Failed to add address');
                return false;
            }
        } catch (err) {
            toast.error('Error adding address');
            console.error('Add address error:', err);
            return false;
        }
    };

    const deleteAddress = async (addressId: string) => {
        if (!session?.accessToken) {
            toast.error('Please login first');
            return false;
        }

        try {
            const result = await removeAddress(addressId, session.accessToken as string);
            
            if (result.status === 'success') {
                toast.success('Address removed successfully!');
                fetchAddresses(); // Refresh the list
                return true;
            } else {
                toast.error('Failed to remove address');
                return false;
            }
        } catch (err) {
            toast.error('Error removing address');
            console.error('Remove address error:', err);
            return false;
        }
    };

    const getAddress = async (addressId: string) => {
        if (!session?.accessToken) {
            toast.error('Please login first');
            return null;
        }

        try {
            const result = await getSpecificAddress(addressId, session.accessToken as string);
            
            if (result.status === 'success' && result.data) {
                return result.data;
            } else {
                toast.error('Address not found');
                return null;
            }
        } catch (err) {
            toast.error('Error fetching address');
            console.error('Get address error:', err);
            return null;
        }
    };

    useEffect(() => {
        if (session?.accessToken) {
            fetchAddresses();
        }
    }, [session?.accessToken]);

    return {
        addresses,
        isLoading,
        error,
        addNewAddress,
        deleteAddress,
        getAddress,
        refetch: fetchAddresses,
        clearError: () => setError(null)
    };
}