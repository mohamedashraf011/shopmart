import { GetAllCategories } from "@/API/allcategoies";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const categories = await GetAllCategories(); 

  return (
    <div className="w-[90%] container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-100 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}