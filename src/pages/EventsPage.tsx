
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleLeft, ToggleRight } from "lucide-react";
import Events from "./Events";
import { useIsMobile } from "@/hooks/use-mobile";
import FilterBar from "@/components/FilterBar";
import TrendingEvents from "@/components/TrendingEvents";

const EventsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleFeatureToggle = (value: string) => {
    if (value === "charts") {
      navigate("/");
    }
  };
  
  return (
    <>
      <section className="bg-gradient-to-b from-clubstro-dark-gray to-clubstro-dark pt-8 pb-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className={`${isMobile ? 'flex-col space-y-4' : 'flex items-center justify-between'}`}>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                Club Events
              </h1>
              <p className="text-gray-400">
                Upcoming club events across different venues
              </p>
            </div>

            <div className={`${isMobile ? 'self-start' : ''}`}>
              <ToggleGroup 
                type="single" 
                defaultValue="events"
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
          
          <TrendingEvents />
          
          <div className="mt-6">
            <Events hideHeader={true} />
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsPage;
