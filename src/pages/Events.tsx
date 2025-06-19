
import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import SectionHeader from "@/components/SectionHeader";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";

interface EventsProps {
  hideHeader?: boolean;
}

// Mock data with updated images
const eventsList = [
  {
    id: 1,
    title: "Afro Night Special",
    venue: "Club Quilox, Lagos",
    date: "Saturday, May 23, 2025",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "Afrobeats"
  },
  {
    id: 2,
    title: "House Party Mix",
    venue: "Cubana Lounge, Abuja",
    date: "Friday, May 29, 2025",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "House"
  },
  {
    id: 3,
    title: "Amapiano Takeover",
    venue: "The Dome, Port Harcourt",
    date: "Saturday, June 5, 2025",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "Amapiano"
  },
  {
    id: 4,
    title: "Hip-Hop Night",
    venue: "Cocoon Club, Lagos",
    date: "Friday, June 12, 2025",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "Hip-Hop"
  },
  {
    id: 5,
    title: "Reggae Beach Party",
    venue: "La Campagne Tropicana, Lagos",
    date: "Sunday, June 14, 2025",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "Reggae"
  },
  {
    id: 6,
    title: "EDM Festival",
    venue: "Eko Convention Centre, Lagos",
    date: "Saturday, June 20, 2025",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=400&fit=crop",
    ticketLink: "#",
    genre: "EDM"
  },
];

const Events = ({ hideHeader = false }: EventsProps) => {
  return (
    <>
      {!hideHeader && (
        <section className="bg-gradient-to-b from-clubstro-dark-gray to-clubstro-dark pt-8 pb-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Upcoming Events</h1>
            <p className="text-gray-400">
              Find the hottest parties and club nights in your city
            </p>
          </div>
        </section>
      )}
      
      <div className={!hideHeader ? "py-8 px-4" : ""}>
        <div className={!hideHeader ? "container mx-auto max-w-6xl" : ""}>
          {!hideHeader && (
            <FilterBar 
              showAmountFilter={false}
              showLocationFilter={true}
              showTimeFilter={true}
              showGenreFilter={true}
              showFrequencyFilter={false}
              defaultLocation="Lagos"
              defaultTime="Today"
              defaultGenre="All"
              filterOrder={["location", "time", "genre"]}
            />
          )}
        
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {eventsList.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button className="bg-clubstro-blue hover:bg-clubstro-blue/90">
              Load More Events
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
