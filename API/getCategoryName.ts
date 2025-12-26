export async function GetCategoryById(categoryId: string) {
    if (!categoryId) {
    throw new Error("Category ID is required");
    }

    console.log("Fetching category details for ID:", categoryId);

    try {
    const endpoint = `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`;

    const res = await fetch(endpoint, {
        cache: "no-store",
    });

    console.log("Category API Response status:", res.status);

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Category API Error Response:", errorText);
        throw new Error(
        `Failed to fetch category: ${res.status} ${res.statusText}`
        );
    }

    const data = await res.json();

    if (!data.data) {
        throw new Error("Invalid category data structure");
    }

    console.log("Category fetched successfully:", data.data.name);
    return data.data;
    } catch (error) {
    console.error("Error in GetCategoryById:", error);
    throw error;
    }
}
