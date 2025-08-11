import type { Restaurant } from '@/types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Spoon',
    image: 'https://placehold.co/600x400.png',
    rating: 4.5,
    price: '$$$',
    distance: '0.5 miles',
    cuisine: 'Italian',
    reviews: [
      "Absolutely divine pasta! The atmosphere is cozy and romantic. A bit pricey, but worth it for a special occasion.",
      "The service was impeccable. I had the lasagna and it was the best I've ever tasted. Highly recommend the tiramisu for dessert.",
      "Good food, but it was very loud. Not ideal for a quiet dinner. The pizza was average."
    ],
  },
  {
    id: '2',
    name: 'Taco Fiesta',
    image: 'https://placehold.co/600x400.png',
    rating: 4.2,
    price: '$$',
    distance: '1.2 miles',
    cuisine: 'Mexican',
    reviews: [
      "Incredible tacos and margaritas! The vibe is fun and lively. Great prices for the quality of food.",
      "A must-visit for Mexican food lovers. The guacamole is fresh and the carnitas are to die for. It can get crowded, so be prepared to wait.",
      "The tacos were a bit greasy for my taste, but the flavors were good. The service was a little slow during peak hours."
    ],
  },
  {
    id: '3',
    name: 'Sushi Zen',
    image: 'https://placehold.co/600x400.png',
    rating: 4.8,
    price: '$$$$',
    distance: '2.5 miles',
    cuisine: 'Japanese',
    reviews: [
      "The freshest sushi I've had in the city. The chef's omakase is an experience you won't forget. Exquisite.",
      "Elegant and serene. Each piece of sushi is a work of art. It's expensive, but the quality is unmatched.",
      "While the sushi is top-notch, the portions are small for the price. I left feeling a bit hungry."
    ],
  },
  {
    id: '4',
    name: 'Dragon Wok',
    image: 'https://placehold.co/600x400.png',
    rating: 3.9,
    price: '$',
    distance: '0.8 miles',
    cuisine: 'Chinese',
    reviews: [
      "Great value for money. The General Tso's chicken is a crowd-pleaser. Perfect for a quick and satisfying meal.",
      "Solid American-style Chinese food. The portions are huge and the lunch specials are a bargain.",
      "The food was okay, nothing special. The restaurant could be cleaner. It's cheap, so you get what you pay for."
    ],
  },
  {
    id: '5',
    name: 'La Pizzeria',
    image: 'https://placehold.co/600x400.png',
    rating: 4.6,
    price: '$$',
    distance: '1.5 miles',
    cuisine: 'Italian',
    reviews: [
      "Authentic Neapolitan pizza. The crust is perfect - chewy and charred in all the right places. Simple, but delicious.",
      "A true gem. The Margherita pizza is perfection. The staff is friendly and the atmosphere is casual and welcoming.",
      "The pizza was excellent, but the salad was a disappointment. Stick to the pizzas and you'll be happy."
    ],
  },
    {
    id: '6',
    name: 'Burger Barn',
    image: 'https://placehold.co/600x400.png',
    rating: 4.3,
    price: '$$',
    distance: '3.1 miles',
    cuisine: 'American',
    reviews: [
      "Juicy burgers and crispy fries. The milkshakes are thick and creamy. A classic American diner experience.",
      "You can't go wrong with the classic cheeseburger. The onion rings are also fantastic. A great family-friendly spot.",
      "The burger was a bit overcooked for my liking. The service was friendly, but a bit slow."
    ],
  },
  {
    id: '7',
    name: 'The Spice Route',
    image: 'https://placehold.co/600x400.png',
    rating: 4.7,
    price: '$$$',
    distance: '2.0 miles',
    cuisine: 'Indian',
    reviews: [
      "Incredible depth of flavor in every dish. The butter chicken is rich and creamy. The naan bread is always fresh and hot.",
      "A fantastic culinary journey. The lamb vindaloo is spicy and flavorful. The service is attentive and knowledgeable.",
      "The food is amazing, but the decor feels a bit dated. The prices are reasonable for the quality."
    ],
  },
  {
    id: '8',
    name: 'Morning Glory Cafe',
    image: 'https://placehold.co/600x400.png',
    rating: 4.4,
    price: '$$',
    distance: '0.3 miles',
    cuisine: 'Brunch',
    reviews: [
      "Best brunch spot in town. The eggs benedict is always on point. Be prepared for a long line on weekends.",
      "I dream about their pancakes. The coffee is also excellent. A cozy and charming place to start your day.",
      "The food was delicious, but the service was rushed. It felt like they were trying to turn tables as quickly as possible."
    ],
  }
];
