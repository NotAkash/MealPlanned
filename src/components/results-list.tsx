
'use client';

import { RestaurantCard, RestaurantCardSkeleton } from "./restaurant-card";
import { usePlacesService } from "@/hooks/use-places-service";
import { Card } from "./ui/card";

interface ResultsListProps {
    location: any;
    searchType: string;
    price: string;
    rating: string;
    distance: number;
    openNow: boolean;
}

export function ResultsList({
    location,
    searchType,
    rating,
    distance,
}: ResultsListProps) {
    const { results, loading, error } = usePlacesService(
        location,
        searchType,
        distance,
        rating
    );

    console.log(results);

    if (error) {
        return (
            <Card className="p-8 text-center text-destructive-foreground bg-destructive">
                <p>Error loading results. Please try again later.</p>
            </Card>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h3 className="text-2xl font-bold mb-8 font-headline">Results</h3>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-a 1 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <RestaurantCardSkeleton key={idx} />
                    ))}
                </div>
            ) : results.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    {results.map((place: any, idx) => (
                        <RestaurantCard key={idx} place={place} />
                    ))}
                </div>
            ) : (
                <Card className="p-8 text-center text-muted-foreground">
                    <p>No search results</p>
                </Card>
            )}
        </div>
    );
}
