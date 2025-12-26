import Link from "next/link";

export default function Home() {
  return (
    <section className="py-30 flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
          Welcome to ShopMart
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/product">
            <button className="px-8 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition cursor-pointer">
              Shop Now
            </button>
          </Link>

          <Link href="/categories">
            <button className="px-8 py-3 rounded-lg border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition cursor-pointer">
              Browse Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
