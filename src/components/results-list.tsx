
'use client';

import { Card } from './ui/card';

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
    price,
    rating,
    distance,
    openNow,
}: ResultsListProps) {
  return (
    <div className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-8 font-headline">Results</h3>
        <Card className="p-8 text-center text-muted-foreground">
            <p>No search results</p>
        </Card>
    </div>
  );
}
