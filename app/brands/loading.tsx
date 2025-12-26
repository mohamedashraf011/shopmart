export default function Loading() {
  return (
    <section className="container w-[90%] mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <div className="h-8 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-md border border-gray-100 p-8 animate-pulse"
          >
            <div className="mb-6 flex items-center justify-center h-32 w-full">
              <div className="bg-gray-200 rounded h-24 w-32"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        ))}
      </div>
    </section>
  );
}