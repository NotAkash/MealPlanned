
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { SearchSection } from '@/components/search-section';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

export default function Home() {
  const [searchType, setSearchType] = useState('restaurants'); // 'restaurants' or 'bars'
  const [price, setPrice] = useState('any');
  const [rating, setRating] = useState('any');
  const [distance, setDistance] = useState(5);
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
      </main>
      <footer className="py-6 bg-secondary/40 mt-auto border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LocalBites. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
