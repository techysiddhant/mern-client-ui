"use client";
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tenant } from '@/lib/types'

const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
    const router = useRouter();
    const handleValueChange = (value: string) => {
        router.push(`/?restaurantId=${value}`)
    }
    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
                {
                    restaurants?.data?.map((restaurant: Tenant) => (
                        <SelectItem key={restaurant.id} value={restaurant.id}>{restaurant.name}</SelectItem>
                    ))
                }

            </SelectContent>
        </Select>
    )
}

export default TenantSelect