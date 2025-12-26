import { Iproduct } from "@/app/interface/product";

export type ProductsByBrandResponse = {
  data: Iproduct[];
};

export async function GetProductsByBrand(brandId: string): Promise<Iproduct[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products for brand: ${brandId}`);
    }

    const result: ProductsByBrandResponse = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    return [];
  }
}