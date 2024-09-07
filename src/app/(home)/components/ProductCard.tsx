import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
                <Dialog>
                    <DialogTrigger asChild >
                        <Button className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">Choose</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-0">
                        <div className="flex">
                            <div className="w-1/3 bg-white  rounded p-8 flex items-center justify-center">
                                <Image src={product.image} alt={product.name} width={450} height={450} />
                            </div>
                            <div className="w-2/3 p-8">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p className="mt-1">{product.description}</p>
                                <div>
                                    <h4 className="mt-6">Choose the size</h4>
                                    <RadioGroup defaultValue="small" className="grid grid-cols-3 gap-4 mt-2">
                                        <div className="">
                                            <RadioGroupItem value="small" className="peer sr-only" aria-label="Small" id="small" />
                                            <Label htmlFor="small" className="flex items-center justify-between flex-col    rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Small</Label>
                                        </div>
                                        <div className="">
                                            <RadioGroupItem value="medium" className="peer sr-only" aria-label="Medium" id="medium" />
                                            <Label htmlFor="medium" className="flex items-center justify-between flex-col    rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Medium</Label>
                                        </div>
                                        <div className="">
                                            <RadioGroupItem value="large" className="peer sr-only" aria-label="Large" id="large" />
                                            <Label htmlFor="large" className="flex items-center justify-between flex-col    rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Large</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <h4 className="mt-6">Choose the crust</h4>
                                <RadioGroup defaultValue="thin" className="grid grid-cols-3 gap-4 mt-2">
                                    <div className="">
                                        <RadioGroupItem value="thin" className="peer sr-only" aria-label="Thin" id="thin" />
                                        <Label htmlFor="thin" className="flex items-center justify-between flex-col    rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Thin</Label>
                                    </div>
                                    <div className="">
                                        <RadioGroupItem value="thick" className="peer sr-only" aria-label="Thick" id="thick" />
                                        <Label htmlFor="thick" className="flex items-center justify-between flex-col    rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Thick</Label>
                                    </div>

                                </RadioGroup>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* <Button className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                    Choose
                </Button> */}
            </CardFooter>
        </Card>
    )
}

export default ProductCard