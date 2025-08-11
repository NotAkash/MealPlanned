import { mockRestaurants } from '@/data/restaurants';
import { RestaurantCard } from './restaurant-card';

export function RestaurantList() {
    const restaurants = mockRestaurants;

    return (
        <div className="container mx-auto px-4 py-12">
            <h3 className="text-2xl font-bold mb-8 font-headline">Restaurants Near You</h3>
            {restaurants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
