"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image'
// import { useState } from 'react';
export type Topping = {
    id: string;
    name: string;
    price: number;
    image: string;
    isAvailable: boolean
}
type PropType = {
    topping: Topping;
    selectedToppings: Topping[];
    handleCheckBoxCheck: (topping: Topping) => void
}
const ToppingCard = ({ topping, selectedToppings, handleCheckBoxCheck }: PropType) => {
    const isCurrentSelected = selectedToppings.some(selectedTopping => selectedTopping.id === topping.id);

    return (
        <Button onClick={() => handleCheckBoxCheck(topping)} variant={"outline"} className={cn('flex flex-col h-44 relative', isCurrentSelected ? "border-primary" : '')}>
            <Image src={topping.image} alt={topping.name} width={60} height={60} />
            <h4>{topping.name}</h4>
            <p>&#8377;{topping.price}</p>
            {
                isCurrentSelected && <CircleCheck className='absolute top-1 right-1 text-primary' />
            }
        </Button>
    )
}

export default ToppingCard