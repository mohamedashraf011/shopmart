import ProductDetails from "@/app/_components/productCart/page";
import { getAllProducts } from "@/API/allproduct";
import { Iproduct } from "@/app/interface/product";

export default async function Product() {
  const { data } = await getAllProducts();

  return (
    <div className="container w-[90%] mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Popular Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {data.map((product: Iproduct) => {
          return <ProductDetails key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}