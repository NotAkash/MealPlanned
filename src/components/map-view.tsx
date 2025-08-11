'use client';

import type { Restaurant } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface MapViewProps {
  restaurants: Restaurant[];
  center?: { lat: number; lng: number };
}

export function MapView({ restaurants, center }: MapViewProps) {
  const mapCenter = center || {
    lat: 44.2312,
    lng: -76.4860,
  };

  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${mapCenter.lat},${mapCenter.lng}&zoom=14`;

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
        
        <div className="container mx-auto px-4 py-12">
            <Card>
                <CardHeader>
                    <CardTitle>Map View Unavailable</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The map view requires a Google Maps API key. Please set the `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable.</p>
                    <p className="mt-2 text-sm text-muted-foreground">For now, here is a list of matching locations:</p>
                    <ul className="mt-4 space-y-2">
                        {restaurants.map(r => (
                            <li key={r.id} className="p-2 border rounded-md">
                                <p className="font-bold">{r.name}</p>
                                <p className="text-sm text-muted-foreground">{r.cuisine} - {r.price} - {r.rating} stars</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
  }

  // This is a simplified map view. A real implementation would use a library like @react-google-maps/api
  // to render interactive pins.
  return (
    <div className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-8 font-headline">Map View</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 h-[600px] rounded-lg overflow-hidden border">
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={mapUrl}
                ></iframe>
            </div>
            <div className="h-[600px] overflow-y-auto pr-4">
                 <h4 className="text-xl font-bold mb-4">Nearby Locations</h4>
                 <div className="space-y-4">
                    {restaurants.map(restaurant => (
                        <Card key={restaurant.id}>
                            <CardContent className="p-4">
                               <CardTitle className="text-lg font-headline mb-2">{restaurant.name}</CardTitle>
                               <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                    <span>{restaurant.rating} ★</span>
                                    <span className="font-bold text-base text-foreground">{restaurant.price}</span>
                               </div>
                               <Badge variant="outline">{restaurant.cuisine}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>
        </div>
    </div>
  );
}
