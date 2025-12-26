interface AddressData {
    name: string;
    details: string;
    phone: string;
    city: string;
}

export async function addAddress(addressData: AddressData, token: string) {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(addressData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding address:", error);
        throw error;
    }
}