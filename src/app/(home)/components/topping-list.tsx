"use client";
import React, { useState } from 'react'
import ToppingCard, { Topping } from './topping-card'
const toppings = [
    {
        id: '1',
        name: 'Extra Cheese',
        price: 50,
        isAvailable: true,
        image: '/cheese.png'
    },
    {
        id: "2",
        name: 'Extra Cheese',
        price: 50,
        isAvailable: true,
        image: '/cheese.png'
    },
    {
        id: "3",
        name: 'Extra Cheese',
        price: 50,
        isAvailable: true,
        image: '/cheese.png'
    }
]
const ToppingList = () => {
    const [selectedToppings, setSelectedToppings] = useState([toppings[0]]);
    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some(selectedTopping => selectedTopping.id === topping.id);
        if (isAlreadyExists) {
            setSelectedToppings((prev) => prev.filter(selectedTopping => selectedTopping.id !== topping.id))
            return;
        }
        setSelectedToppings((prev) => [...prev, topping]);

    }
    return (
        <section className='mt-6 '>
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-4 mt-3">
                {
                    toppings.map(topping => {
                        return <ToppingCard key={topping.id} topping={topping} selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
                    })
                }
            </div>
        </section>
    )
}

export default ToppingList