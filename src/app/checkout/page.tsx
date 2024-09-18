import React from 'react'
import CustomerForm from './_components/CustomerForm';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const CheckoutPage = async ({
    searchParams,
}: {
    searchParams: { restaurantId: string };
}) => {
    const session = await getSession();

    const sParams = new URLSearchParams(searchParams);
    const existingQueryString = sParams.toString();

    sParams.append('return-to', `/checkout?${existingQueryString}`);
    if (!session) {
        redirect(`/login?${sParams}`);
    }
    return (
        <CustomerForm />
    )
}

export default CheckoutPage