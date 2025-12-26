export async function getProductDetails(id: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    const result = await response.json();
    return result.data;
}