"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tenant } from '@/lib/types'

const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleValueChange = (value: string) => {
        router.push(`/?restaurantId=${value}`)
    }
    return (
        <Select onValueChange={handleValueChange} defaultValue={searchParams.get("restaurantId") || ""}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
                {
                    restaurants?.data?.map((restaurant: Tenant) => (
                        <SelectItem key={restaurant.id} value={restaurant.id.toString()}>{restaurant.name}</SelectItem>
                    ))
                }

            </SelectContent>
        </Select>
    )
}

export default TenantSelect