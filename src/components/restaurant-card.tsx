"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { Restaurant } from '@/types';
import { Star, Map, Sparkles, Loader2, ServerCrash, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { summarizeRestaurantReviews } from '@/ai/flows/summarize-restaurant-reviews';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSummarizeReviews = async () => {
    setIsDialogOpen(true);
    if (summary) return;

    setIsLoading(true);
    setError('');
    try {
      const result = await summarizeRestaurantReviews({
        restaurantName: restaurant.name,
        reviews: restaurant.reviews,
      });
      setSummary(result.summary);
    } catch (e) {
      setError('Failed to generate summary. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={cn('h-4 w-4', i < Math.floor(rating) ? 'text-accent fill-accent' : 'text-muted-foreground/30')} />
        ))}
        <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl border">
        <CardHeader className="p-0 relative">
          <div className="absolute top-3 right-3 z-10">
             <Button
              variant="secondary"
              size="icon"
              className="rounded-full h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => setIsFavorite(!isFavorite)}
            >
                <Heart className={cn("h-5 w-5 transition-all", isFavorite ? "fill-primary text-primary" : "text-muted-foreground")} />
                <span className="sr-only">Favorite</span>
            </Button>
          </div>
          <div className="aspect-[16/10] relative">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
              data-ai-hint="restaurant food"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="outline" className="mb-2 font-semibold">{restaurant.cuisine}</Badge>
          <CardTitle className="text-xl font-bold font-headline mb-2">{restaurant.name}</CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            {renderRating(restaurant.rating)}
            <span className="font-bold text-lg text-foreground">{restaurant.price}</span>
          </div>
          <p className="text-sm text-muted-foreground">~{restaurant.distance} away</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
          <Button variant="outline">
            <Map className="mr-2 h-4 w-4" />
            View Map
          </Button>
          <Button onClick={handleSummarizeReviews}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Summary
          </Button>
        </CardFooter>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              AI Review Summary
            </DialogTitle>
            <DialogDescription>
              An AI-powered summary of recent reviews for {restaurant.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 min-h-[120px] flex items-center justify-center">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Generating summary...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-2 text-destructive">
                <ServerCrash className="h-8 w-8" />
                <p className="text-center">{error}</p>
              </div>
            ) : (
              <p className="text-sm text-foreground leading-relaxed">{summary}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
