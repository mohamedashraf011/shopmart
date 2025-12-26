export async function getCart(token: string) {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "GET",
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
        console.error("Error fetching cart:", error);
        throw error;
    }
}