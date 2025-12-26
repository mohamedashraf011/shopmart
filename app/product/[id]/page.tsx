import { getProductDetails } from "@/API/productDetails";
import { notFound } from "next/navigation";
import ProductGallery from "./ProductGallery"; 
import AddToCartButton from "@/app/_components/AddToCartButton"; 

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data;
  try {
    data = await getProductDetails(id);

    if (!data) {
      notFound();
    }
  } catch (error) {
    return (
      <div className="container w-[90%] mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          An error occurred while loading product details.
        </h2>
        <p className="text-gray-600">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container w-[90%] mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <ProductGallery imageCover={data.imageCover} images={data.images} />

        <div className="flex flex-col gap-8">
          <div className="flex justify-between text-lg font-semibold text-gray-500">
            <span>{data.brand?.name}</span>
          </div>

          <h1 className="text-3xl font-bold">{data.title}</h1>

          <div className="text-gray-500">
            <span>{data.category?.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </div>
            <span>{data.ratingsAverage}</span>
          </div>

          <p className="text-xl text-gray-800">{data.description}</p>

          <div className="text-3xl font-semibold">
            {data.price} EGP
          </div>

          <div className="flex gap-4">
            <AddToCartButton 
                productId={data._id}
                className="flex-1 flex items-center justify-center gap-3 bg-black text-white py-3 rounded-full cursor-pointer hover:bg-gray-800 transition"
            >
                <i className="fas fa-shopping-cart"></i>
                Add To Cart
            </AddToCartButton>

            <button className="w-14 h-14 rounded-full border flex items-center justify-center cursor-pointer hover:border-black transition">
              <i className="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}