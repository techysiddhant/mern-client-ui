'use client';
import React from 'react';
import { z } from 'zod';
// import { v4 as uuidv4 } from 'uuid';
import { Coins, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
// import { useAppDispatch } from '@/lib/store/hooks';
import { useSearchParams } from 'next/navigation';
import AddAddress from './AddAddress';
import OrderSummary from './orderSummary';
import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '@/lib/http/api';
const formSchema = z.object({
    address: z.string({ required_error: 'Please select an address.' }),
    paymentMode: z.enum(['card', 'cash'], {
        required_error: 'You need to select a payment mode type.',
    }),
    comment: z.any(),
});
const CustomerForm = () => {
    // const dispatch = useAppDispatch();
    const { data: customer, isLoading } = useQuery({
        queryKey: ['customer'],
        queryFn: async () => {
            return await getCustomer().then((res) => res.data)
        }
    });

    // console.log(customer);
    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const searchParam = useSearchParams();
    if (isLoading) {
        return <div>Loading...</div>
    }
    // const chosenCouponCode = React.useRef('');
    // const idempotencyKeyRef = React.useRef('');
    const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
        const tenantId = searchParam.get('restaurantId');
        if (!tenantId) {
            alert('Restaurant Id is required!');
            return;
        }
        console.log(data);
        // const orderData: OrderData = {
        //     cart: cart.cartItems,
        //     couponCode: chosenCouponCode.current ? chosenCouponCode.current : '',
        //     tenantId: tenantId,
        //     customerId: customer ? customer._id : '',
        //     comment: data.comment,
        //     address: data.address,
        //     paymentMode: data.paymentMode,
        // };

        // mutate(orderData);
    };
    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className="flex container mx-auto gap-6 mt-16">
                    <Card className="w-3/5 border-none">
                        <CardHeader>
                            <CardTitle>Customer details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input
                                        id="fname"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer?.firstName}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input
                                        id="lname"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer?.lastName}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer?.email}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="name">Address</Label>
                                            <AddAddress customerId={customer?._id} />
                                        </div>

                                        <FormField
                                            name="address"
                                            control={customerForm.control}
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                className="grid grid-cols-2 gap-6 mt-2">

                                                                {customer?.addresses.map(
                                                                    (address: any) => {
                                                                        return (
                                                                            <Card
                                                                                className="p-6"
                                                                                key={address.text}>
                                                                                <FormControl>

                                                                                    <div className="flex items-center space-x-2  ">
                                                                                        <RadioGroupItem

                                                                                            value={
                                                                                                address.text
                                                                                            }
                                                                                            id={
                                                                                                address.text
                                                                                            }
                                                                                        />
                                                                                        <Label
                                                                                            htmlFor={
                                                                                                address.text
                                                                                            }
                                                                                            className="leading-normal block w-full cursor-pointer">
                                                                                            {
                                                                                                address.text
                                                                                            }
                                                                                        </Label>
                                                                                    </div>

                                                                                </FormControl>

                                                                            </Card>
                                                                        );
                                                                    }
                                                                )}
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label>Payment Mode</Label>
                                    <FormField
                                        name="paymentMode"
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            className="flex gap-6">
                                                            <div className="w-36">
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={'card'}
                                                                        id={'card'}
                                                                        className="peer sr-only"
                                                                        aria-label={'card'}
                                                                    />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={'card'}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <CreditCard size={'20'} />
                                                                    <span className="ml-2">
                                                                        Card
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                            <div className="w-36">
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={'cash'}
                                                                        id={'cash'}
                                                                        className="peer sr-only"
                                                                        aria-label={'cash'}
                                                                    />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={'cash'}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <Coins size={'20'} />
                                                                    <span className="ml-2 text-md">
                                                                        Cash
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">Comment</Label>
                                    <FormField
                                        name="comment"
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <OrderSummary
                    // isPlaceOrderPending={isPlaceOrderPending}
                    // handleCouponCodeChange={(code) => {
                    //     chosenCouponCode.current = code;
                    // }}
                    />
                </div>
            </form>
        </Form>
    )
}

export default CustomerForm