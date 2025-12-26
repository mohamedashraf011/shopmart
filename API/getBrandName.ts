export type BrandResponse = {
  data: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
};

export async function GetBrandById(brandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch brand: ${brandId}`);
    }

    const result: BrandResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return { _id: brandId, name: "Unknown Brand", slug: "", image: "" };
  }
}