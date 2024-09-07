import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/ProductCard";
const product: Product[] =
  [
    {
      id: "1",
      name: "Onion Pizza",
      description: "Cheesy Delight",
      image: "/pizza-main.png",
      price: 150
    },
    {
      id: "2",
      name: "Corn Pizza",
      description: "Cheesy Delight",
      image: "/pizza-main.png",
      price: 150
    },
    {
      id: "3",
      name: "Mushroom Pizza",
      description: "Cheesy Delight",
      image: "/pizza-main.png",
      price: 150
    },
    {
      id: "4",
      name: "Peperoni Pizza",
      description: "Cheesy Delight",
      image: "/pizza-main.png",
      price: 150
    },
    {
      id: "5",
      name: "Cheese Pizza",
      description: "Cheesy Delight",
      image: "/pizza-main.png",
      price: 150
    },
    {
      id: "6",
      name: "Veggie Pizza",
      description: "Cheesy Delight",
      image: "/pizza-main.png",
      price: 150
    },
    {
      id: "7",
      name: "Panner Pizza",
      description: "Cheesy Delight",
      image: "/pizza-main.png",
      price: 150
    },
  ]
export default function Home() {
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
      <section className="bg-background">
        <div className="container mx-auto py-12">
          <Tabs defaultValue="pizza" className="">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md">Pizza</TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizza" >
              <div className="grid grid-cols-4 gap-6 mt-6">
                {
                  product.map((product) => {
                    return (
                      <ProductCard key={product.id} product={product} />
                    )
                  })
                }
              </div>
            </TabsContent>
            <TabsContent value="beverages">Beverages List</TabsContent>
          </Tabs>
        </div>

      </section>
    </>
  );
}
