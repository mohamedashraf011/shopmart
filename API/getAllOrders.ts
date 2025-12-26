export async function getAllOrders(token: string) {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/orders", {
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
        console.error("Error fetching all orders:", error);
        throw error;
    }
}