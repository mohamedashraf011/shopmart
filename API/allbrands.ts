
export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type BrandsResponse = {
  data: Brand[];
};

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    const result: BrandsResponse = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}