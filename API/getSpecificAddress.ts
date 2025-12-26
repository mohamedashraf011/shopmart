export async function getSpecificAddress(addressId: string, token: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
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
        console.error("Error fetching specific address:", error);
        throw error;
    }
}