
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SongCard from "@/components/SongCard";
import FilterBar from "@/components/FilterBar";
import SectionHeader from "@/components/SectionHeader";
import TrendingSongs from "@/components/TrendingSongs";
import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data - in a real app this would come from an API
const chartSongs = [
  {
    id: 1,
    rank: 1,
    title: "Peso",
    artist: "Kendrick Lamar",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    genre: "Hip-Hop"
  },
  {
    id: 2,
    rank: 2,
    title: "Not Like Us",
    artist: "Kendrick Lamar",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
    genre: "Hip-Hop"
  },
  {
    id: 3,
    rank: 3,
    title: "Texas Hold 'Em",
    artist: "Beyoncé",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    genre: "Country"
  },
  {
    id: 4,
    rank: 4,
    title: "Water",
    artist: "Tyla",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop",
    genre: "Pop/R&B"
  },
  {
    id: 5,
    rank: 5,
    title: "Espresso",
    artist: "Sabrina Carpenter",
    image: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=400&h=400&fit=crop",
    genre: "Pop"
  },
];

const Index = () => {
  const [activeFrequency, setActiveFrequency] = useState("Weekend");
  const [chartHeaderText, setChartHeaderText] = useState("This Weekend's Hot Tracks");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleFeatureToggle = (value: string) => {
    if (value === "events") {
      navigate("/events");
    }
  };

  useEffect(() => {
    switch(activeFrequency) {
      case "Daily":
        setChartHeaderText("Today's Hot Tracks");
        break;
      case "Weekly":
        setChartHeaderText("This Week's Hot Tracks");
        break;
      case "Weekend":
        setChartHeaderText("This Weekend's Hot Tracks");
        break;
      case "Monthly":
        setChartHeaderText("This Month's Hot Tracks");
        break;
      default:
        setChartHeaderText("This Weekend's Hot Tracks");
    }
  }, [activeFrequency]);

  return (
    <>
      <section className="bg-gradient-to-b from-clubstro-dark-gray to-clubstro-dark pt-8 pb-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className={`${isMobile ? 'flex-col space-y-4' : 'flex items-center justify-between'}`}>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                Club Charts
              </h1>
              <p className="text-gray-400">
                The most played songs in clubs across different locations
              </p>
            </div>

            <div className={`${isMobile ? 'self-start' : ''}`}>
              <ToggleGroup 
                type="single" 
                defaultValue="charts"
                onValueChange={handleFeatureToggle}
                className="bg-clubstro-dark rounded-full p-1.5"
              >
                <ToggleGroupItem 
                  value="charts" 
                  className="rounded-full text-white hover:bg-white/10 data-[state=on]:bg-clubstro-purple data-[state=on]:text-white"
                  aria-label="View charts"
                >
                  <ToggleLeft className="mr-2 h-4 w-4" />
                  Charts
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="events" 
                  className="rounded-full text-white hover:bg-white/10 data-[state=on]:bg-clubstro-purple data-[state=on]:text-white"
                  aria-label="View events"
                >
                  <ToggleRight className="mr-2 h-4 w-4" />
                  Events
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>
        
      <section className="py-8 px-4 bg-clubstro-dark-gray/50">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader 
            title="Top Charts" 
            subtitle="The most popular tracks this week"
          />
          
          <FilterBar onFrequencyChange={setActiveFrequency} />
          
          <TrendingSongs />
          
          <div className="mt-8 mb-4">
            <h2 className="text-base font-bold text-white">{chartHeaderText}</h2>
            <p className="text-gray-400 text-sm">Most played tracks by club-goers</p>
          </div>
          
          <div className="grid gap-4 mt-4">
            {chartSongs.map((song) => (
              <SongCard key={song.id} {...song} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
