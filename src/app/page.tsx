'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { SearchSection } from '@/components/search-section';
import { RestaurantList } from '@/components/restaurant-list';
import { MapView } from '@/components/map-view';
import { mockRestaurants } from '@/data/restaurants';
import type { Restaurant } from '@/types';
import { Button } from '@/components/ui/button';
import { Map, List } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('restaurants'); // 'restaurants' or 'bars'
  const [price, setPrice] = useState('any');
  const [rating, setRating] = useState('any');
  const [isBudgetFriendly, setIsBudgetFriendly] = useState(false);
  const [distance, setDistance] = useState(5);
  const [view, setView] = useState<'list' | 'map'>('list');

  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter(restaurant => {
      const matchesType = searchType === 'restaurants' ? restaurant.type === 'restaurant' : restaurant.type === 'bar';
      const matchesSearchTerm = searchTerm.trim() === '' || restaurant.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = price === 'any' || restaurant.price.length === parseInt(price, 10);
      const matchesRating = rating === 'any' || restaurant.rating >= parseInt(rating, 10);
      const matchesBudget = !isBudgetFriendly || restaurant.price.length <= 2;
      const matchesDistance = restaurant.distance <= distance;
      
      return matchesType && matchesSearchTerm && matchesPrice && matchesRating && matchesBudget && matchesDistance;
    });
  }, [searchTerm, searchType, price, rating, isBudgetFriendly, distance]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <SearchSection 
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          searchType={searchType}
          onSearchTypeChange={setSearchType}
          price={price}
          onPriceChange={setPrice}
          rating={rating}
          onRatingChange={setRating}
          isBudgetFriendly={isBudgetFriendly}
          onBudgetFriendlyChange={setIsBudgetFriendly}
          distance={distance}
          onDistanceChange={setDistance}
        />
        <div className="container mx-auto px-4 py-6 flex justify-end">
            <Button variant="outline" onClick={() => setView(view === 'list' ? 'map' : 'list')}>
                {view === 'list' ? <Map className="mr-2 h-4 w-4" /> : <List className="mr-2 h-4 w-4" />}
                {view === 'list' ? 'Map View' : 'List View'}
            </Button>
        </div>

        {view === 'list' ? (
            <RestaurantList restaurants={filteredRestaurants} />
        ) : (
            <MapView restaurants={filteredRestaurants} />
        )}
      </main>
      <footer className="py-6 bg-secondary/40 mt-auto border-t">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} LocalBites. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
