export async function clearCart(token: string) {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
    }
}