"use client";

import { GetProductsByBrand } from "@/API/productsByBrand";
import { GetBrandById } from "@/API/getBrandName";
import CategoryProductCard from "@/app/_components/CategoryProductCard/page";
import { Iproduct } from "@/app/interface/product";
import { useEffect, useState } from "react";

export default function BrandProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [brandId, setBrandId] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { id } = await params;
        setBrandId(id);

        const [productsData, brandData] = await Promise.all([
          GetProductsByBrand(id).catch(() => [] as Iproduct[]),
          GetBrandById(id),
        ]);

        setProducts(productsData || []);
        setBrandName(brandData.name || "Unknown Brand");

      } catch (err) {
        console.error("Error loading brand page:", err);
        setError(err instanceof Error ? err.message : "Failed to load brand");
        setBrandName("Brand Not Found");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full max-w-[300]">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm animate-pulse">
                <div className="p-4">
                  <div className="w-full h-[260] bg-gray-200 rounded"></div>
                </div>
                <div className="px-4 space-y-2 pb-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Error Loading Brand</h2>
        <p className="text-red-500 mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="container w-[90%] mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-5">
        {brandName || "Loading..."}
      </h2>
      <p className="text-xl text-gray-600 text-center mb-10">
        ({products.length} {products.length === 1 ? "Product" : "Products"} from this brand)
      </p>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No products found for this brand</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {products.map((product: Iproduct) => (
            <CategoryProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}