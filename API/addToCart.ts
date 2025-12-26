export async function addToCart(productId: string, token: string) {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({
                productId: productId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw error;
    }
}