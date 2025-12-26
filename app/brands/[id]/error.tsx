"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4 text-red-600">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">
        {error.message || "Failed to load brand products"}
      </p>
      <button
        onClick={reset}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  );
}