'use client';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';
import React from 'react';

export function PlacesAutocomplete({
  onLocationChange,
  defaultValue = ''
}: {
  onLocationChange: (location: any) => void;
  defaultValue?: string;
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'ca' },
    },
    debounce: 300,
    defaultValue
  });

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSelect =
    (suggestion: any) =>
    () => {
      setValue(suggestion.description, false);
      clearSuggestions();

      onLocationChange({
        label: suggestion.description,
        value: {
          description: suggestion.description,
        },
      });
    };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="p-2 hover:bg-accent cursor-pointer"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div className="relative w-full">
      <Textarea
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search by city/town..."
        className={cn('w-full rounded-lg border pl-10 pr-4 py-2')}
        rows={1}
      />
      {status === 'OK' && (
        <ul className="absolute z-10 w-full bg-card border rounded-lg mt-1 shadow-lg">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
}
