export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: '$' | '$$' | '$$$' | '$$$$';
  distance: number;
  cuisine: string;
  reviews: string[];
  type: 'restaurant' | 'bar';
  latitude: number;
  longitude: number;
}
