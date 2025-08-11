"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Restaurant } from '@/types';
import { Star, Map, Sparkles, Loader2, ServerCrash, Heart, Share2 } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { summarizeRestaurantReviews } from '@/ai/flows/summarize-restaurant-reviews';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  layout?: 'grid' | 'row';
}

export function RestaurantCard({ restaurant, layout = 'grid' }: RestaurantCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // window is only available on the client
    setShareUrl(`${window.location.origin}/r/${restaurant.id}`);
  }, [restaurant.id]);


  const handleShare = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied!",
      description: "Restaurant link has been copied to your clipboard.",
    });
  }

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
  
  if (layout === 'row') {
    return (
      <>
        <Card className="flex overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl border">
          <div className="w-1/3 relative">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
              data-ai-hint="restaurant food"
            />
          </div>
          <div className="w-2/3 flex flex-col">
            <CardHeader className="p-4 flex-grow">
               <Badge variant="outline" className="mb-2 font-semibold w-fit">{restaurant.cuisine}</Badge>
              <CardTitle className="text-xl font-bold font-headline mb-2">{restaurant.name}</CardTitle>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                {renderRating(restaurant.rating)}
                <span className="font-bold text-lg text-foreground">{restaurant.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">~{restaurant.distance}km away</p>
            </CardHeader>
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
          </div>
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
    )
  }

  return (
    <>
      <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl border">
        <CardHeader className="p-0 relative">
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Share</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>Copy Link</Button>
                    <Button size="sm" asChild>
                        <a href={`https://wa.me/?text=Check%20out%20this%20restaurant%3A%20${encodeURIComponent(restaurant.name)}%20${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </Button>
                    <Button size="sm" asChild>
                       <a href={`instagram://direct/new?text=${encodeURIComponent('Check out this restaurant: ' + restaurant.name + ' ' + shareUrl)}`} >DM</a>
                    </Button>
                </div>
              </PopoverContent>
            </Popover>
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
          <p className="text-sm text-muted-foreground">~{restaurant.distance}km away</p>
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
