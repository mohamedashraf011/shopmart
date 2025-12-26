export async function updateCartItem(productId: string, count: number, token: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({
                count: count
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw error;
    }
}