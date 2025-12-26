interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
}

export async function createOnlineOrder(cartId: string, shippingAddress: ShippingAddress, token: string, successUrl?: string, cancelUrl?: string) {
    try {
        const baseUrl = window.location.origin;
        const success = successUrl || `${baseUrl}/payment/success`;
        const cancel = cancelUrl || `${baseUrl}/payment/cancel`;
        
        const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(success)}`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({
                shippingAddress: shippingAddress
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating online order:", error);
        throw error;
    }
}