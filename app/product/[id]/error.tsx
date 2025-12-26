"use client";

export default function Error() {
  return (
    <div className="container w-[90%] mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600">
        Failed to load product details. Please try again later.
      </p>
    </div>
  );
}