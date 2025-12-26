interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
}

export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress, token: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
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
        console.error("Error creating cash order:", error);
        throw error;
    }
}