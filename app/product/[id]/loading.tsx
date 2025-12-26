export default function Loading() {
  return (
    <div className="container w-[90%] mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-200 rounded-2xl border p-6 h-[420px] animate-pulse"></div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-8">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}