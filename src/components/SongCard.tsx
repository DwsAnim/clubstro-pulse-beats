
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SongCardProps {
  id: number;
  rank?: number;
  title: string;
  artist: string;
  image: string;
  genre?: string;
  variant?: "horizontal" | "vertical";
  showPlayButton?: boolean;
}

const SongCard = ({
  id,
  rank,
  title,
  artist,
  image,
  genre,
  variant = "vertical",
  showPlayButton = true,
}: SongCardProps) => {
  return (
    <div 
      className={cn(
        "bg-clubstro-dark-gray rounded-lg overflow-hidden animate-fade-in",
        variant === "horizontal" ? "flex items-center" : "flex flex-col"
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        variant === "horizontal" ? "h-24 w-24 flex-shrink-0" : "w-full aspect-square"
      )}>
        {rank && (
          <div className="absolute top-2 left-2 bg-black/70 dark:bg-black/70 light:bg-black/90 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold text-white">
            {rank}
          </div>
        )}
        <img
          src={image}
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover"
        />
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/30 transition-opacity duration-200">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </Button>
          </div>
        )}
      </div>
      
      <div className={cn(
        "p-3",
        variant === "horizontal" ? "flex-grow" : ""
      )}>
        <h3 className="font-bold text-white line-clamp-1">{title}</h3>
        <p className="text-gray-400 text-sm">{artist}</p>
        {genre && (
          <span className="inline-block bg-clubstro-blue/20 text-clubstro-blue text-xs px-2 py-1 rounded mt-2">
            {genre}
          </span>
        )}
      </div>
    </div>
  );
};

export default SongCard;
