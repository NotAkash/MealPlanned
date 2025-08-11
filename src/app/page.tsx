'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { SearchSection } from '@/components/search-section';
import { RestaurantList } from '@/components/restaurant-list';
import { MapView } from '@/components/map-view';
import { mockRestaurants } from '@/data/restaurants';
import type { Restaurant } from '@/types';
import { Button } from '@/components/ui/button';
import { Map, List } from 'lucide-react';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('restaurants'); // 'restaurants' or 'bars'
  const [price, setPrice] = useState('any');
  const [rating, setRating] = useState('any');
  const [distance, setDistance] = useState(5);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [openNow, setOpenNow] = useState(false);
  const [location, setLocation] = useState<any>({
    label: '99 University Ave, Kingston, ON K7L 3N6, Canada',
    value: {
        description: '99 University Ave, Kingston, ON K7L 3N6, Canada',
        lat: 44.2253,
        lng: -76.4951,
        city: 'Kingston'
    }
  });

  const handleLocationChange = (selectedLocation: any) => {
    if (selectedLocation && selectedLocation.value) {
        getGeocode({ address: selectedLocation.value.description }).then(results => {
            const { lat, lng } = getLatLng(results[0]);
            const addressComponents = results[0].address_components;
            const cityComponent = addressComponents.find(c => c.types.includes('locality') || c.types.includes('administrative_area_level_2'));
            const city = cityComponent ? cityComponent.long_name : '';
            
            setLocation({
                ...selectedLocation,
                value: {
                    ...selectedLocation.value,
                    lat,
                    lng,
                    city
                }
            });
        });
    } else {
        setLocation(null);
    }
  };


  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter(restaurant => {
      const matchesType = searchType === 'restaurants' ? restaurant.type === 'restaurant' : restaurant.type === 'bar';
      
      const matchesSearchTerm = !location || !location.value || !location.value.city || (restaurant.city.toLowerCase() === location.value.city.toLowerCase());

      const matchesPrice = price === 'any' || restaurant.price.length === parseInt(price, 10);
      const matchesRating = rating === 'any' || restaurant.rating >= parseInt(rating, 10);
      const matchesDistance = restaurant.distance <= distance;
      const matchesOpenNow = !openNow || restaurant.isOpen;
      
      return matchesType && matchesSearchTerm && matchesPrice && matchesRating && matchesDistance && matchesOpenNow;
    });
  }, [searchType, price, rating, distance, openNow, location]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <SearchSection 
          location={location}
          onLocationChange={handleLocationChange}
          searchType={searchType}
          onSearchTypeChange={setSearchType}
          price={price}
          onPriceChange={setPrice}
          rating={rating}
          onRatingChange={setRating}
          distance={distance}
          onDistanceChange={setDistance}
          openNow={openNow}
          onOpenNowChange={setOpenNow}
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
            <MapView restaurants={filteredRestaurants} center={location?.value} />
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
