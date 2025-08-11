import { Header } from '@/components/layout/header';
import { SearchSection } from '@/components/search-section';
import { RestaurantList } from '@/components/restaurant-list';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <SearchSection />
        <RestaurantList />
      </main>
      <footer className="py-6 bg-secondary/40 mt-auto border-t">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} LocalBites. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
