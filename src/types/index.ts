
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
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  isOpen: boolean;
}
