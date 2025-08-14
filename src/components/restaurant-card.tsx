
'use client';

import { Button } from './ui/button';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function RestaurantCard({ place }: { place: any }) {
    const viewOnMap = () => {
        if (place.location) {
            const url = `https://www.google.com/maps/search/?api=1&query=${place.displayName.text}&query_place_id=${place.id}`;
            window.open(url, '_blank');
        }
    };

    return (
        <Card className="p-6 flex flex-col justify-between">
            <div>
                <h4 className="text-lg font-bold">
                    {place.displayName || 'Unnamed Place'}
                </h4>
                <p className='text-sm text-muted-foreground'>{place.formattedAddress}</p>
                <p className="text-sm">Rating: {place.rating || 'N/A'} ⭐</p>
                <p className="text-sm">Price Level: {place.priceLevel || ''} ~ {place.priceRange} : {place.endPrice}</p>
            </div>
            <Button onClick={viewOnMap} className="mt-4 w-full">
                View on Map
            </Button>
        </Card>
    );
}

export function RestaurantCardSkeleton() {
    return (
        <Card className="p-6">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <Skeleton className="h-10 w-full" />
        </Card>
    )
}
