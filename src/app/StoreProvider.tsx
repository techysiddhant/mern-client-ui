'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store/store'
import { setInitialCartItems } from '@/lib/store/features/cart/cartSlice'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        // TODO: add initial data from persist store
        const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;
        if (isLocalStorageAvailable) {
            const cartItems = window.localStorage.getItem("cartItems");
            try {
                if (cartItems) {
                    const parsedItem = JSON.parse(cartItems);
                    storeRef.current.dispatch(setInitialCartItems(parsedItem))
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}