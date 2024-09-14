"use client";
import React, { useEffect, useState } from 'react'
import ToppingCard from './topping-card'
import { Topping } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

const ToppingList = ({ handleCheckBoxCheck, selectedToppings }: { selectedToppings: Topping[]; handleCheckBoxCheck: (topping: Topping) => void }) => {
    const [toppings, setToppings] = useState<Topping[]>([]);
    const searchParams = useSearchParams();
    useEffect(() => {
        const fetchToppings = async () => {
            const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${searchParams?.get("restaurantId")}`);
            const toppings = await toppingResponse.json();
            setToppings(toppings.data);
            // console.log(toppings.data);
        }
        fetchToppings();
    }, [])

    return (
        <section className='mt-6 '>
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-4 mt-3">
                {
                    toppings?.map(topping => {
                        return <ToppingCard key={topping.id} topping={topping} selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
                    })
                }
            </div>
        </section>
    )
}

export default ToppingList