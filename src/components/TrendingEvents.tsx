
import { useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from "@/components/ui/carousel";
import EventCard from "@/components/EventCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface Event {
  id: number;
  title: string;
  venue: string;
  date: string;
  image: string;
  ticketLink: string;
  genre: string;
  isFavorite?: boolean;
}

const defaultEvents = [
  {
    id: 201,
    title: "Afrobeats Fusion Party",
    venue: "Club Quilox, Lagos",
    date: "Saturday, May 24, 2025",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "Afrobeats"
  },
  {
    id: 202,
    title: "House Music Festival",
    venue: "Ocean View Terrace, Accra",
    date: "Sunday, May 25, 2025",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "House"
  },
  {
    id: 203,
    title: "Amapiano Night",
    venue: "The Dome, Nairobi",
    date: "Friday, May 30, 2025",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "Amapiano"
  }
];

const TrendingEvents = () => {
  const isMobile = useIsMobile();
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  
  useEffect(() => {
    // Load custom events if available
    const savedEvents = localStorage.getItem('trendingEvents');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          // Sort events: favorites first, then by date
          const sortedEvents = [...parsedEvents].sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return 0;
          });
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error('Error parsing saved events:', error);
      }
    }
  }, []);

  return (
    <section className="mb-8 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white">Trending Events</h2>
      </div>
      
      <Carousel 
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {events.map((event) => (
            <CarouselItem 
              key={event.id} 
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <EventCard {...event} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TrendingEvents;
