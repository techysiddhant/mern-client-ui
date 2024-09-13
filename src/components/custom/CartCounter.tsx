"use client";
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

const CartCounter = () => {
    // const dispatch = useAppDispatch();
    // const value = useAppSelector((state) => state.cart.value);
    // const handleIncement = () => {
    //     dispatch(increment());
    // }
    return (

        <>
            <div className="relative">
                <Link href="/cart">
                    <ShoppingBasket className="hover:text-primary" />
                </Link>
                <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
                    3
                </span>
            </div>
            <button >Increment</button>
        </>
    )
}

export default CartCounter