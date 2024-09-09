import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductList from "./components/product-list";
import { Suspense } from "react";
export default async function Home() {
  // //TODO: Do concurrent request with promise.all
  // const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
  //   next: {
  //     revalidate: 3600
  //   }
  // });
  // if (!categoryResponse.ok) throw new Error("Failed to fetch category");
  // const categories = await categoryResponse.json();
  // //TODO: add dynamic tenant ID
  // const productResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=7`, {
  //   next: {
  //     revalidate: 3600
  //   }
  // });
  // if (!productResponse.ok) throw new Error("Failed to fetch products");
  // const products: { data: Product[] } = await productResponse.json();
  // console.log(products);
  // console.log(categories);
  return (
    <>
      <section className="bg-white ">
        <div className="container mx-auto flex items-center justify-between py-24">
          <div>
            <h1 className="text-7xl font-black font-sans ">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image src="/pizza-main.png" alt="pizza-main" width={400} height={400} />
          </div>
        </div>
      </section>
      {/* TODO: Add skeleton */}
      <Suspense fallback={"Loading"}>
        <ProductList />
      </Suspense>

    </>
  );
}
