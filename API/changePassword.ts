interface ChangePasswordData {
    currentPassword: string;
    password: string;
    rePassword: string;
}

export async function changePassword(passwordData: ChangePasswordData, token: string) {
    try {
        console.log("Sending change password request...");
        console.log("Token:", token ? "Token exists" : "No token");
        console.log("Token value:", token); // طباعة الـ token الفعلي
        
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": token  // جرب بدون Bearer
            },
            body: JSON.stringify(passwordData)
        });

        console.log("Response status:", response.status);
        
        const data = await response.json();
        console.log("Response data:", data);

        if (!response.ok) {
            // إذا كان هناك رسالة خطأ من الـ API، استخدمها
            const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
}