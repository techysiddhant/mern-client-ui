"use client";
import { useAppSelector } from '@/lib/store/hooks';
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

const CartCounter = () => {
    const value = useAppSelector((state) => state.cart.cartItems.length);
    return (
        <>
            <div className="relative">
                <Link href="/cart">
                    <ShoppingBasket className="hover:text-primary" />
                </Link>
                <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
                    {value}
                </span>
            </div>
        </>
    )
}

export default CartCounter