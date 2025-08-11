'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { SearchSection } from '@/components/search-section';
import { RestaurantList } from '@/components/restaurant-list';
import { mockRestaurants } from '@/data/restaurants';
import type { Restaurant } from '@/types';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('restaurants'); // 'restaurants' or 'bars'
  const [price, setPrice] = useState('any');
  const [rating, setRating] = useState('any');

  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter(restaurant => {
      const matchesType = searchType === 'restaurants' ? !restaurant.cuisine.toLowerCase().includes('bar') : restaurant.cuisine.toLowerCase().includes('bar');
      const matchesSearchTerm = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = price === 'any' || restaurant.price.length === parseInt(price, 10);
      const matchesRating = rating === 'any' || restaurant.rating >= parseInt(rating, 10);
      
      return matchesType && matchesSearchTerm && matchesPrice && matchesRating;
    });
  }, [searchTerm, searchType, price, rating]);

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
        />
        <RestaurantList restaurants={filteredRestaurants} />
      </main>
      <footer className="py-6 bg-secondary/40 mt-auto border-t">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} LocalBites. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
