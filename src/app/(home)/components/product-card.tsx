import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/lib/types";
import ProductModal from "./product-modal";
import { getFromPrice } from "@/lib/utils";

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
                        {/* ₹{product.price} */}
                        ₹{getFromPrice(product)}
                    </span>
                </p>
                <ProductModal product={product} />
            </CardFooter>
        </Card>
    )
}

export default ProductCard