
import type { Restaurant } from '@/types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Spoon',
    image: 'https://placehold.co/600x400.png',
    rating: 4.5,
    price: '$$$',
    distance: 0.8,
    cuisine: 'Italian',
    type: 'restaurant',
    address: '123 Queen St, Kingston, ON',
    city: 'Kingston',
    latitude: 44.2323,
    longitude: -76.4813,
    reviews: [
      "Absolutely divine pasta! The atmosphere is cozy and romantic. A bit pricey, but worth it for a special occasion.",
      "The service was impeccable. I had the lasagna and it was the best I've ever tasted. Highly recommend the tiramisu for dessert.",
      "Good food, but it was very loud. Not ideal for a quiet dinner. The pizza was average."
    ],
    openingHours: { 'weekday': '11:00-22:00', 'weekend': '12:00-23:00' },
    isOpen: true
  },
  {
    id: '2',
    name: 'Taco Fiesta',
    image: 'https://placehold.co/600x400.png',
    rating: 4.2,
    price: '$$',
    distance: 1.9,
    cuisine: 'Mexican',
    type: 'restaurant',
    address: '456 Princess St, Kingston, ON',
    city: 'Kingston',
    latitude: 44.2299,
    longitude: -76.4851,
    reviews: [
      "Incredible tacos and margaritas! The vibe is fun and lively. Great prices for the quality of food.",
      "A must-visit for Mexican food lovers. The guacamole is fresh and the carnitas are to die for. It can get crowded, so be prepared to wait.",
      "The tacos were a bit greasy for my taste, but the flavors were good. The service was a little slow during peak hours."
    ],
    openingHours: { 'weekday': '12:00-21:00', 'weekend': '12:00-22:00' },
    isOpen: true
  },
  {
    id: '3',
    name: 'Sushi Zen',
    image: 'https://placehold.co/600x400.png',
    rating: 4.8,
    price: '$$$$',
    distance: 4.0,
    cuisine: 'Japanese',
    type: 'restaurant',
    address: '789 King St, Kingston, ON',
    city: 'Kingston',
    latitude: 44.2345,
    longitude: -76.4799,
    reviews: [
      "The freshest sushi I've had in the city. The chef's omakase is an experience you won't forget. Exquisite.",
      "Elegant and serene. Each piece of sushi is a work of art. It's expensive, but the quality is unmatched.",
      "While the sushi is top-notch, the portions are small for the price. I left feeling a bit hungry."
    ],
    openingHours: { 'weekday': '17:00-22:00', 'weekend': '17:00-23:00' },
    isOpen: false
  },
  {
    id: '4',
    name: 'The Alibi Room',
    image: 'https://placehold.co/600x400.png',
    rating: 4.4,
    price: '$$',
    distance: 0.5,
    cuisine: 'Bar, Cocktails',
    type: 'bar',
    address: '101 Division St, Kingston, ON',
    city: 'Kingston',
    latitude: 44.2307,
    longitude: -76.4859,
    reviews: [
      "Best cocktail bar in the city, hands down. The mixologists are true artists. A must-visit for cocktail connoisseurs.",
      "Dimly lit and intimate, it's a great spot for a date. The drink menu is extensive and creative.",
      "It's a small place and can get crowded quickly. The drinks are pricey, but you're paying for quality."
    ],
    openingHours: { 'weekday': '18:00-02:00', 'weekend': '18:00-02:00' },
    isOpen: true
  },
  {
    id: '5',
    name: 'The Iron Duke',
    image: 'https://placehold.co/600x400.png',
    rating: 4.1,
    price: '$$',
    distance: 1.2,
    cuisine: 'Pub, Bar',
    type: 'bar',
    address: '202 Wellington St, Kingston, ON',
    city: 'Kingston',
    latitude: 44.2295,
    longitude: -76.4831,
    reviews: [
      "Classic pub with a great atmosphere. The fish and chips are fantastic. Great selection of beers on tap.",
      "A cozy spot to grab a pint. The staff is friendly and the service is quick.",
      "Can get very busy on weekends. The food is decent pub grub."
    ],
    openingHours: { 'weekday': '12:00-01:00', 'weekend': '12:00-02:00' },
    isOpen: true
  },
  {
    id: '6',
    name: 'Atomica',
    image: 'https://placehold.co/600x400.png',
    rating: 4.6,
    price: '$$',
    distance: 0.9,
    cuisine: 'Italian',
    type: 'restaurant',
    address: '303 Brock St, Kingston, ON',
    city: 'Kingston',
    latitude: 44.2291,
    longitude: -76.4842,
    reviews: [
      "Modern Italian with a twist. The pizzas are creative and delicious. Great cocktail menu as well.",
      "A vibrant and bustling atmosphere. The food is consistently good. Reservations are recommended.",
      "The music was a bit too loud for a conversation. The service was excellent, though."
    ],
    openingHours: { 'weekday': '17:00-22:00', 'weekend': '17:00-23:00' },
    isOpen: true
  },
  {
    id: '7',
    name: 'The Golden Spoon - Toronto',
    image: 'https://placehold.co/600x400.png',
    rating: 4.5,
    price: '$$$',
    distance: 0.8,
    cuisine: 'Italian',
    type: 'restaurant',
    address: '1 Yonge St, Toronto, ON',
    city: 'Toronto',
    latitude: 43.6532,
    longitude: -79.3832,
    reviews: [
      "Absolutely divine pasta! The atmosphere is cozy and romantic. A bit pricey, but worth it for a special occasion.",
      "The service was impeccable. I had the lasagna and it was the best I've ever tasted. Highly recommend the tiramisu for dessert.",
      "Good food, but it was very loud. Not ideal for a quiet dinner. The pizza was average."
    ],
    openingHours: { 'weekday': '11:00-22:00', 'weekend': '12:00-23:00' },
    isOpen: true
  },
  {
    id: '8',
    name: 'Taco Fiesta - Toronto',
    image: 'https://placehold.co/600x400.png',
    rating: 4.2,
    price: '$$',
    distance: 1.9,
    cuisine: 'Mexican',
    type: 'restaurant',
    address: '2 Bloor St, Toronto, ON',
    city: 'Toronto',
    latitude: 43.6560,
    longitude: -79.3800,
    reviews: [
      "Incredible tacos and margaritas! The vibe is fun and lively. Great prices for the quality of food.",
      "A must-visit for Mexican food lovers. The guacamole is fresh and the carnitas are to die for. It can get crowded, so be prepared to wait.",
      "The tacos were a bit greasy for my taste, but the flavors were good. The service was a little slow during peak hours."
    ],
    openingHours: { 'weekday': '12:00-21:00', 'weekend': '12:00-22:00' },
    isOpen: true
  },
  {
    id: '9',
    name: 'The Alibi Room - Toronto',
    image: 'https://placehold.co/600x400.png',
    rating: 4.4,
    price: '$$',
    distance: 0.5,
    cuisine: 'Bar, Cocktails',
    type: 'bar',
    address: '3 Queen St W, Toronto, ON',
    city: 'Toronto',
    latitude: 43.6515,
    longitude: -79.3872,
    reviews: [
      "Best cocktail bar in the city, hands down. The mixologists are true artists. A must-visit for cocktail connoisseurs.",
      "Dimly lit and intimate, it's a great spot for a date. The drink menu is extensive and creative.",
      "It's a small place and can get crowded quickly. The drinks are pricey, but you're paying for quality."
    ],
    openingHours: { 'weekday': '18:00-02:00', 'weekend': '18:00-02:00' },
    isOpen: true
  }
];
