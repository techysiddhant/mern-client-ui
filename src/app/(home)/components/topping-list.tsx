"use client";
import React, { startTransition, useEffect, useState } from 'react'
import ToppingCard from './topping-card'
import { Topping } from '@/lib/types';

const ToppingList = () => {
    const [toppings, setToppings] = useState<Topping[]>([]);
    useEffect(() => {
        const fetchToppings = async () => {
            const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=7`);
            const toppings = await toppingResponse.json();
            setToppings(toppings.data);
            // console.log(toppings.data);
        }
        fetchToppings();
    }, [])
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