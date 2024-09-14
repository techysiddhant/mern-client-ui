import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "./product-card"
import { Category, Product } from "@/lib/types"

const ProductList = async ({ searchParams }: { searchParams: { restaurantId: string } }) => {
    //TODO: Do concurrent request with promise.all
    const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
        next: {
            revalidate: 3600
        }
    });
    if (!categoryResponse.ok) throw new Error("Failed to fetch category");
    const categories = await categoryResponse.json();
    //TODO: add dynamic tenant ID
    const productResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=${searchParams?.restaurantId}`, {
        next: {
            revalidate: 3600
        }
    });
    if (!productResponse.ok) throw new Error("Failed to fetch products");
    const products: { data: Product[] } = await productResponse.json();

    return (
        <section className="bg-background">
            <div className="container mx-auto py-12">
                <Tabs defaultValue={categories[0]._id}>
                    <TabsList >
                        {
                            categories.map((category: Category) => (
                                <TabsTrigger key={category._id} value={category._id} className="text-md">{category.name}</TabsTrigger>
                            ))
                        }

                    </TabsList>
                    {
                        categories.map((category: Category) => (
                            <TabsContent key={category._id} value={category._id} >
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {
                                        products?.data?.filter(product => product.category._id === category._id).map((product) => {
                                            return (
                                                <ProductCard key={product._id} product={product} />
                                            )
                                        })
                                    }
                                </div>
                            </TabsContent>
                        ))
                    }

                </Tabs>
            </div>

        </section>
    )
}

export default ProductList