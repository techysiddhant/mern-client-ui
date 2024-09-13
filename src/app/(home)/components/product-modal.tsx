"use client";
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import ToppingList from "./topping-list"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Product, Topping } from "@/lib/types"
import { startTransition, Suspense, useMemo, useState } from "react"
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
type ChosenConfig = {
    [key: string]: string
}
const ProductModal = ({ product }: { product: Product }) => {
    const defaultConfiguration = Object.entries(product.category.priceConfiguration).map(([key, value]) => {
        return {
            [key]: value.availableOptions[0]
        }
    }).reduce((acc, item) => {
        return {
            ...acc,
            ...item
        }
    }, {})
    const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(defaultConfiguration as unknown as ChosenConfig);


    const dispatch = useAppDispatch();
    const handleRadioChange = (key: string, data: string) => {
        console.log(key, data);
        startTransition(() => {
            setChosenConfig((prev) => {
                return {
                    ...prev, [key]: data
                }
            })
        })
    }
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some((selectedTopping: Topping) => selectedTopping.id === topping.id);
        startTransition(() => {
            if (isAlreadyExists) {
                setSelectedToppings((prev: Topping[]) => prev.filter((selectedTopping: Topping) => selectedTopping.id !== topping.id))
                return;
            }
            setSelectedToppings((prev: Topping[]) => [...prev, topping]);
        })
    }
    const handleAddToCart = (product: Product) => {
        const itemToAdd = {
            product,
            chosenConfiguration: {
                priceConfiguration: chosenConfig!,
                selectedToppings: selectedToppings
            }
        }
        dispatch(addToCart(itemToAdd))
    }
    const totalPrice = useMemo(() => {
        const toppingsTotal = selectedToppings.reduce((acc, item) => {
            return acc + item.price
        }, 0);
        const configPricing = Object.entries(chosenConfig).reduce((acc, [key, value]: [string, string]) => {
            const price = product.priceConfiguration[key].availableOptions[value];
            return acc + price
        }, 0);
        return configPricing + toppingsTotal
    }, [chosenConfig, selectedToppings, product.priceConfiguration])
    return (
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
                        {
                            Object.entries(product.category.priceConfiguration).map(([key, value]) => (
                                <div key={key}>
                                    <h4 className="mt-6">Choose the {key}</h4>
                                    <RadioGroup onValueChange={(data) => { handleRadioChange(key, data) }} defaultValue={value.availableOptions[0]} className="grid grid-cols-3 gap-4 mt-2">
                                        {
                                            value?.availableOptions?.map((option) => (
                                                <div className="" key={option}>
                                                    <RadioGroupItem value={option} className="peer sr-only" aria-label={option} id={option} />
                                                    <Label htmlFor={option} className="flex items-center justify-between flex-col    rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">{option}

                                                        <span className="mt-1 font-semibold">
                                                            ₹
                                                            {product.priceConfiguration[key].availableOptions[option]}
                                                        </span>

                                                    </Label>
                                                </div>
                                            ))
                                        }

                                    </RadioGroup>
                                </div>
                            ))
                        }
                        <Suspense fallback={"Loading..."}>

                            <ToppingList handleCheckBoxCheck={handleCheckBoxCheck} selectedToppings={selectedToppings} />
                        </Suspense>
                        <div className="flex justify-between items-center mt-12">
                            <span className="font-bold">
                                {/* ₹{product.price} */}
                                ₹{totalPrice}

                            </span>
                            <Button onClick={() => handleAddToCart(product)}>
                                <ShoppingCart size={20} />
                                <span className="ml-2">Add to cart</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal