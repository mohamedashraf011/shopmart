export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export async function GetAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}