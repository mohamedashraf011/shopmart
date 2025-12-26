export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-full max-w-[300px]">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm animate-pulse">
              <div className="p-4">
                <div className="w-full h-[260px] bg-gray-200 rounded"></div>
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