import type { Restaurant } from '@/types';
import { RestaurantCard } from './restaurant-card';

interface RestaurantListProps {
    restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <h3 className="text-2xl font-bold mb-8 font-headline">Restaurants Near You</h3>
            {restaurants.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border rounded-lg bg-card">
                    <p className="text-muted-foreground">No restaurants found. Try adjusting your search.</p>
                </div>
            )}
        </div>
    );
}
