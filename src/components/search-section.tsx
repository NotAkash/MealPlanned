
"use client";

import { useState, useEffect } from 'react';
import { Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { PlacesAutocomplete } from './places-autocomplete';

interface SearchSectionProps {
    location: any;
    onLocationChange: (value: any) => void;
    searchType: string;
    onSearchTypeChange: (value: string) => void;
    price: string;
    onPriceChange: (value: string) => void;
    rating: string;
    onRatingChange: (value: string) => void;
    distance: number;
    onDistanceChange: (value: number) => void;
    openNow: boolean;
    onOpenNowChange: (value: boolean) => void;
}


export function SearchSection({
    location,
    onLocationChange,
    searchType,
    onSearchTypeChange,
    price,
    onPriceChange,
    rating,
    onRatingChange,
    distance,
    onDistanceChange,
    openNow,
    onOpenNowChange
}: SearchSectionProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <section className="py-12 border-b">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-headline mb-2">Find your next favorite bite</h2>
                    <p className="text-muted-foreground">Discover great restaurants and bars near you in Canada.</p>
                </div>
                <div className="max-w-4xl mx-auto bg-card p-6 rounded-xl shadow-md">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                             <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10"><Search/></div>
                             {isClient && <PlacesAutocomplete key={location?.label} onLocationChange={onLocationChange} defaultValue={location?.label} />}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                        <RadioGroup value={searchType} onValueChange={onSearchTypeChange} className="flex items-center col-span-1 sm:col-span-1">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="restaurants" id="r-restaurants" />
                                <Label htmlFor="r-restaurants">Restaurants</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bars" id="r-bars" />
                                <Label htmlFor="r-bars">Bars</Label>
                            </div>
                        </RadioGroup>
                        <Select value={price} onValueChange={onPriceChange}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Any Price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Price</SelectItem>
                                <SelectItem value="1">$</SelectItem>
                                <SelectItem value="2">$$</SelectItem>
                                <SelectItem value="3">$$$</SelectItem>
                                <SelectItem value="4">$$$$</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={rating} onValueChange={onRatingChange}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Any Rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Rating</SelectItem>
                                <SelectItem value="4">4+ Stars</SelectItem>
                                <SelectItem value="3">3+ Stars</SelectItem>
                                <SelectItem value="2">2+ Stars</SelectItem>
                                <SelectItem value="1">1+ Star</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex items-center space-x-2">
                            <Switch id="open-now" checked={openNow} onCheckedChange={onOpenNowChange} />
                            <Label htmlFor="open-now" className='flex items-center gap-2'><Clock className="h-4 w-4"/>Open Now</Label>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Label>Distance: &lt; {distance} km</Label>
                        <Slider
                            value={[distance]}
                            onValueChange={(value) => onDistanceChange(value[0])}
                            max={10}
                            step={1}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
