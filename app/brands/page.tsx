import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { getAllBrands } from "@/API/allbrands";

const loadBrands = cache(async () => {
  return await getAllBrands();
});

export default async function Brands() {
  const brands = await loadBrands();

  if (brands.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          No brands available at the moment
        </h2>
      </div>
    );
  }

  return (
    <section className="container w-[90%] mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Brands
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group flex flex-col items-center justify-center bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 p-8"
          >
            <div className="mb-6 flex items-center justify-center h-32">
              <Image
                src={brand.image}
                alt={brand.name}
                width={200}
                height={120}
                className="object-contain max-h-32 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300"
                priority
              />
            </div>

            <h3 className="text-lg font-medium text-gray-800 tracking-wider">
              {brand.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}