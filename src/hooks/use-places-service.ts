
'use client';

import { useEffect, useState } from 'react';

export function usePlacesService(
  location: any,
  searchType: string,
  distance: number,
  rating: string
) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchNearbyResults() {
      if (!location?.value?.lat || !location?.value?.lng) return;

      setLoading(true);
      setError(null);

      try {
        // @ts-ignore: Google Maps types may not be loaded
        const center = new google.maps.LatLng(location.value.lat, location.value.lng);

        const request = {
          fields: ['displayName', 'location', 'businessStatus', 'rating', 'formattedAddress', 'priceLevel'],
          locationRestriction: {
            center,
            radius: distance * 1000,
          },
          includedPrimaryTypes: [searchType || 'restaurant'],
          maxResultCount: 10,
          rankPreference: google.maps.places.SearchNearbyRankPreference.DISTANCE,
          language: 'en-US',
          region: 'ca',
        };

        // @ts-ignore: Google Maps JS SDK
        const { places } = await google.maps.places.Place.searchNearby(request);

        const filtered = rating !== 'any'
            ? places.filter((p: any) => p.rating >= Number(rating))
            : places;

        setResults(filtered);
      } catch (err){
        setError(err);
        console.error('Error fetching nearby places:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNearbyResults();
  }, [location, searchType, distance, rating]);

  return { results, loading, error };
}
