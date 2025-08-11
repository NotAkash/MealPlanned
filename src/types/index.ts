export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: '$' | '$$' | '$$$' | '$$$$';
  distance: string;
  cuisine: string;
  reviews: string[];
  type?: 'restaurant' | 'bar';
}
