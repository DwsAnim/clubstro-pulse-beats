
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem
} from "@/components/ui/carousel";
import SongCard from "@/components/SongCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

interface TrendingSongsProps {
  isAdmin?: boolean;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  genre: string;
  url?: string;
}

const defaultSongs = [
  {
    id: 101,
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    genre: "Pop"
  },
  {
    id: 102,
    title: "Espresso",
    artist: "Sabrina Carpenter",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    genre: "Pop"
  },
  {
    id: 103,
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    genre: "Alternative/Pop"
  },
  {
    id: 104,
    title: "Snooze",
    artist: "SZA",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop",
    genre: "R&B"
  },
  {
    id: 105,
    title: "Houdini",
    artist: "Dua Lipa",
    image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=400&h=400&fit=crop",
    genre: "Dance/Pop"
  }
];

const TrendingSongs = ({ isAdmin = false }: TrendingSongsProps) => {
  const isMobile = useIsMobile();
  const [showWidget, setShowWidget] = useState(true);
  const [trendingSongs, setTrendingSongs] = useState<Song[]>(defaultSongs);
  
  useEffect(() => {
    // Check if admin has disabled the widget
    const widgetEnabled = localStorage.getItem('showTrendingSongs');
    if (widgetEnabled !== null) {
      setShowWidget(widgetEnabled === 'true');
    }
    
    // Load custom songs if available
    const savedSongs = localStorage.getItem('trendingSongs');
    if (savedSongs) {
      try {
        const parsedSongs = JSON.parse(savedSongs);
        if (Array.isArray(parsedSongs) && parsedSongs.length > 0) {
          setTrendingSongs(parsedSongs);
        }
      } catch (error) {
        console.error('Error parsing saved songs:', error);
      }
    }
  }, []);
  
  // If the widget is disabled by admin and not in admin mode, don't render
  if (!showWidget && !isAdmin) {
    return null;
  }

  return (
    <section className="mb-2">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold text-white">Trending Songs</h2>
      </div>
      
      <Carousel 
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {trendingSongs.map((song) => (
            <CarouselItem 
              key={song.id} 
              className="pl-2 md:pl-4 basis-full"
            >
              <div className="h-[80px] sm:h-[90px]">
                <SongCard
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  image={song.image}
                  genre={song.genre}
                  variant="horizontal"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TrendingSongs;
