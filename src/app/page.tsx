
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
import { getDistance } from '@/lib/utils';

export default function Home() {
  const [searchType, setSearchType] = useState('restaurants'); // 'restaurants' or 'bars'
  const [price, setPrice] = useState('any');
  const [rating, setRating] = useState('any');
  const [distance, setDistance] = useState(50);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [openNow, setOpenNow] = useState(false);
  const [location, setLocation] = useState<any | null>(null);

  useEffect(() => {
    // Set default location on initial render
    const defaultAddress = "99 University Ave, Kingston, ON K7L 3N6, Canada";
    getGeocode({ address: defaultAddress }).then(results => {
        const { lat, lng } = getLatLng(results[0]);
        const addressComponents = results[0].address_components;
        const cityComponent = addressComponents.find(c =>
          c.types.includes('locality')
        );
        const city = cityComponent ? cityComponent.long_name : 'Kingston';

        setLocation({
          label: defaultAddress,
          value: {
            description: defaultAddress,
            lat,
            lng,
            city,
          },
        });
      });
  }, [])


  const handleLocationChange = (selectedLocation: any) => {
    if (selectedLocation && selectedLocation.value && selectedLocation.value.description) {
      getGeocode({ address: selectedLocation.value.description }).then(results => {
        const { lat, lng } = getLatLng(results[0]);
        const addressComponents = results[0].address_components;
        const cityComponent = addressComponents.find(c =>
          c.types.includes('locality')
        );
        const city = cityComponent ? cityComponent.long_name : '';

        setLocation({
          label: selectedLocation.value.description,
          value: {
            description: selectedLocation.value.description,
            lat,
            lng,
            city,
          },
        });
      });
    } else {
      setLocation(null);
    }
  };

  const restaurantsWithDistance = useMemo(() => {
    if (!location?.value?.lat || !location?.value?.lng) {
      // Return all restaurants with a default large distance if no location is set
      return mockRestaurants.map(restaurant => ({ ...restaurant, distance: 9999 }));
    }
    
    return mockRestaurants.map(restaurant => {
      const distanceFromLocation = getDistance(
        { lat: location.value.lat, lng: location.value.lng },
        { lat: restaurant.latitude, lng: restaurant.longitude }
      );
      return { ...restaurant, distance: distanceFromLocation };
    });
  }, [location]);


  const filteredRestaurants = useMemo(() => {
    return restaurantsWithDistance.filter(restaurant => {
      const matchesType = searchType === 'restaurants' ? restaurant.type === 'restaurant' : restaurant.type === 'bar';
      const matchesPrice = price === 'any' || restaurant.price.length === parseInt(price, 10);
      const matchesRating = rating === 'any' || restaurant.rating >= parseInt(rating, 10);
      const matchesOpenNow = !openNow || restaurant.isOpen;
      const matchesDistance = restaurant.distance < distance;

      return matchesType && matchesPrice && matchesRating && matchesOpenNow && matchesDistance;
    });
  }, [searchType, price, rating, openNow, distance, restaurantsWithDistance]);


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
          <Button
            variant="outline"
            onClick={() => setView(view === 'list' ? 'map' : 'list')}
          >
            {view === 'list' ? (
              <Map className="mr-2 h-4 w-4" />
            ) : (
              <List className="mr-2 h-4 w-4" />
            )}
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
