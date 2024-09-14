import React from 'react'
import CustomerForm from './_components/CustomerForm';

const CheckoutPage = ({
    searchParams,
}: {
    searchParams: { restaurantId: string };
}) => {
    const sParams = new URLSearchParams(searchParams);
    const existingQueryString = sParams.toString();

    sParams.append('return-to', `/checkout?${existingQueryString}`);

    return (
        <CustomerForm />
    )
}

export default CheckoutPage