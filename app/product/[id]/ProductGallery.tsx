'use client';

import { useState } from "react";

export default function ProductGallery({ imageCover, images }: { imageCover: string; images?: string[] }) {
  const [mainImage, setMainImage] = useState(imageCover);

  const allImages = [imageCover, ...(images || [])];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl border p-6 flex items-center justify-center">
        <img
          src={mainImage}
          alt="Main product"
          className="w-full max-h-[420px] object-contain transition-all duration-300"
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {allImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setMainImage(image)}
              className={`bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all hover:border-black ${
                mainImage === image ? "border-black" : "border-gray-200"
              }`}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-24 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}