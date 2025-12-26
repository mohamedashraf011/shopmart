"use client";

export default function Error() {
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-10">Something went wrong</h2>
      <p className="text-red-500">Failed to load category products</p>
    </div>
  );
}