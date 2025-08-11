import { UtensilsCrossed, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-headline">LocalBites</h1>
        </div>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <UserCircle className="h-7 w-7 text-muted-foreground" />
          <span className="sr-only">Sign In</span>
        </Button>
      </div>
    </header>
  );
}
