import { getAllProducts } from "./allproduct";

export async function GetProductsByCategory(categoryId: string) {
  console.log("Fetching products for category:", categoryId);
  
  try {
    const endpoints = [
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      `https://ecommerce.routemisr.com/api/v1/products/category/${categoryId}`
    ];

    let lastError;
    
    for (const endpoint of endpoints) {
      try {
        console.log("Trying endpoint:", endpoint);
        const res = await fetch(endpoint, {
          cache: "no-store",
        });

        console.log("API Response status:", res.status);

        if (res.ok) {
          const data = await res.json();
          console.log("API Response data:", data);
          
          if (data.data && data.data.length > 0) {
            return data.data;
          }
        } else {
          const errorText = await res.text();
          console.error(`Server Error for ${endpoint}:`, errorText);
          lastError = new Error(`Failed to fetch products: ${res.status}`);
        }
      } catch (error) {
        console.error(`Error with endpoint ${endpoint}:`, error);
        lastError = error;
      }
    }
    
    console.log("Trying fallback: filtering all products by category");
    try {
      const allProductsResponse = await getAllProducts();
      const allProducts = allProductsResponse.data || [];
      
      const filteredProducts = allProducts.filter((product: any) => 
        product.category && product.category._id === categoryId
      );
      
      console.log("Filtered products:", filteredProducts.length);
      return filteredProducts;
      
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw lastError || fallbackError;
    }
    
  } catch (error) {
    console.error("Error in GetProductsByCategory:", error);
    throw error;
  }
}
