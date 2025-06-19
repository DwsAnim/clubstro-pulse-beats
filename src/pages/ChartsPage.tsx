
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleLeft, ToggleRight } from "lucide-react";
import Charts from "./Charts";
import FilterBar from "@/components/FilterBar";
import { useIsMobile } from "@/hooks/use-mobile";

const ChartsPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleFeatureToggle = (value: string) => {
    if (value === "events") {
      navigate("/events");
    }
  };
  
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
      
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <FilterBar filterOrder={["amount", "frequency", "location", "genre"]} />
          <div className="mt-6">
            <Charts hideHeader={true} hideTabs={true} isAdmin={true} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ChartsPage;
