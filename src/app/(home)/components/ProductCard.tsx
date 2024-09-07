import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}
type PropTypes = { product: Product }
const ProductCard = ({ product }: PropTypes) => {
    return (
        <Card className="border-none rounded-xl">
            <CardHeader className="flex items-center justify-center">
                <Image src={product.image} alt={product.name} width={150} height={150} />
            </CardHeader>
            <CardContent>
                <p className="text-xl font-bold">{product.name}</p>
                <p className="mt-2">{product.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <p>
                    <span>From </span>
                    <span>
                        ₹{product.price}
                    </span>
                </p>
                <Button className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                    Choose
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard