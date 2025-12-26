import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { addToCart } from '../../API/addToCart';
import { toast } from 'sonner';

export function useCart() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddToCart = async (productId: string) => {
        if (!session?.accessToken) {
            setError('Please login first');
            return false;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await addToCart(productId, session.accessToken as string);
            
            if (result.status === 'success') {
                toast.success('Product added to cart successfully! 🛒');
                return true;
            } else {
                toast.error('Failed to add product to cart');
                setError('Failed to add product to cart');
                return false;
            }
        } catch (err) {
            toast.error('Error adding product to cart');
            setError('Error adding product to cart');
            console.error('Cart error:', err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        addToCart: handleAddToCart,
        isLoading,
        error,
        clearError: () => setError(null)
    };
}