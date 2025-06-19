
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

interface EventCardProps {
  id: number;
  title: string;
  venue: string;
  date: string;
  image: string;
  ticketLink?: string;
  genre?: string;
}

const EventCard = ({
  id,
  title,
  venue,
  date,
  image,
  ticketLink,
  genre,
}: EventCardProps) => {
  return (
    <div className="bg-clubstro-dark-gray rounded-lg overflow-hidden flex flex-col animate-fade-in">
      <div className="relative w-full aspect-[2/1] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center text-clubstro-blue mb-2">
          <CalendarIcon size={16} className="mr-2" />
          <span className="text-sm">{date}</span>
        </div>
        
        <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
        <p className="text-gray-400 mb-3">{venue}</p>
        
        {genre && (
          <span className="inline-block bg-clubstro-purple/20 text-clubstro-purple text-xs px-2 py-1 rounded mb-3">
            {genre}
          </span>
        )}
        
        <div className="mt-auto">
          {ticketLink && (
            <Button 
              className="w-full bg-clubstro-blue hover:bg-clubstro-blue/90"
              onClick={() => window.open(ticketLink, '_blank')}
            >
              Make a Reservation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
