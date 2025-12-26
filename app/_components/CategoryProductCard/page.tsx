"use client";

import { Iproduct } from "@/app/interface/product";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";

export default function CategoryProductCard({ product }: { product: Iproduct }) {
  const truncateTitle = (title: string, wordsCount = 3) => {
    const words = title.split(" ");
    if (words.length <= wordsCount) return title;
    return words.slice(0, wordsCount).join(" ") + "...";
  };

  return (
    <div className="w-full max-w-[300]">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
        
        {/* Image */}
        <Link href={`/product/${product._id}`}>
          <div className="p-4">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-[260] object-contain"
            />
          </div>

          {/* Content */}
          <div className="px-4 space-y-1">
            {/* Brand */}
            <p className="text-sm text-gray-500">
              {product.brand?.name || "DeFacto"}
            </p>

            {/* Title */}
            <h3 className="text-lg font-semibold min-h-[28]">
              {truncateTitle(product.title)}
            </h3>

            {/* Category */}
            <p className="text-sm text-gray-500">
              {product.category.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
              <span className="text-gray-500 text-sm ml-1">
                ({product.ratingsQuantity || 18})
              </span>
            </div>

            {/* Price */}
            <p className="text-lg font-bold py-2">
              EGP {product.price.toFixed(2)}
            </p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3 p-4">
          <AddToCartButton 
            productId={product._id}
            className="flex-1 bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition cursor-pointer"
          >
            <i className="fas fa-shopping-cart"></i>
            Add To Cart
          </AddToCartButton>

          <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
            <i className="far fa-heart text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}