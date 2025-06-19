
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface FilterBarProps {
  showAmountFilter?: boolean;
  showLocationFilter?: boolean;
  showFrequencyFilter?: boolean;
  showGenreFilter?: boolean;
  showTimeFilter?: boolean;
  defaultAmount?: string;
  defaultLocation?: string;
  defaultFrequency?: string;
  defaultGenre?: string;
  defaultTime?: string;
  onFrequencyChange?: (frequency: string) => void;
  filterOrder?: Array<"amount" | "frequency" | "location" | "genre" | "time">;
}

const FilterBar = ({
  showAmountFilter = true,
  showLocationFilter = true,
  showFrequencyFilter = true,
  showGenreFilter = true,
  showTimeFilter = false,
  defaultAmount = "Top 20",
  defaultLocation = "All",
  defaultFrequency = "Weekend",
  defaultGenre = "All",
  defaultTime = "All",
  onFrequencyChange,
  filterOrder,
}: FilterBarProps) => {
  const [activeAmount, setActiveAmount] = useState(defaultAmount);
  const [activeLocation, setActiveLocation] = useState(defaultLocation);
  const [activeFrequency, setActiveFrequency] = useState(defaultFrequency);
  const [activeGenre, setActiveGenre] = useState(defaultGenre);
  const [activeTime, setActiveTime] = useState(defaultTime);

  const locations = ["All", "Lagos", "Abuja", "Port Harcourt", "Accra", "Nairobi"];
  const frequencies = ["Daily", "Weekend", "Weekly", "Monthly"];
  const genres = ["All", "Afrobeats", "Amapiano", "Hip-Hop", "Dancehall"];
  const amounts = ["Top 5", "Top 20", "Top 50", "Top 100"];
  const times = ["All", "Today", "This Week", "Upcoming"];

  // Notify parent component when frequency changes
  useEffect(() => {
    if (onFrequencyChange) {
      onFrequencyChange(activeFrequency);
    }
  }, [activeFrequency, onFrequencyChange]);

  // Default filter order if not provided
  const defaultFilterOrder = ["amount", "frequency", "location", "genre", "time"];
  // If we're on events page, use the events page specific order
  const eventsPageOrder = ["location", "time", "genre"];
  
  // Check if we're on the events page by looking at which filters are shown
  const isEventsPage = showTimeFilter && !showFrequencyFilter && !showAmountFilter;
  
  // Select the appropriate order based on the page
  const pageSpecificOrder = isEventsPage ? eventsPageOrder : defaultFilterOrder;
  const resolvedFilterOrder = filterOrder || pageSpecificOrder;

  // Function to render a specific filter
  const renderFilter = (filterType: string) => {
    switch (filterType) {
      case "amount":
        return showAmountFilter && (
          <Select key="amount" defaultValue={activeAmount} onValueChange={setActiveAmount}>
            <SelectTrigger className="bg-clubstro-purple/90 hover:bg-clubstro-purple text-white border-0 rounded-full w-auto min-w-[120px] transition-colors">
              <SelectValue placeholder={defaultAmount} />
            </SelectTrigger>
            <SelectContent>
              {amounts.map((amount) => (
                <SelectItem key={amount} value={amount}>
                  {amount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "frequency":
        return showFrequencyFilter && (
          <Select key="frequency" defaultValue={activeFrequency} onValueChange={setActiveFrequency}>
            <SelectTrigger className="bg-clubstro-purple/90 hover:bg-clubstro-purple text-white border-0 rounded-full w-auto min-w-[120px] transition-colors">
              <SelectValue placeholder={defaultFrequency} />
            </SelectTrigger>
            <SelectContent>
              {frequencies.map((frequency) => (
                <SelectItem key={frequency} value={frequency}>
                  {frequency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "location":
        return showLocationFilter && (
          <Select key="location" defaultValue={activeLocation} onValueChange={setActiveLocation}>
            <SelectTrigger className="bg-clubstro-purple/90 hover:bg-clubstro-purple text-white border-0 rounded-full w-auto min-w-[120px] transition-colors">
              <SelectValue placeholder={defaultLocation} />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "genre":
        return showGenreFilter && (
          <Select key="genre" defaultValue={activeGenre} onValueChange={setActiveGenre}>
            <SelectTrigger className="bg-clubstro-purple/90 hover:bg-clubstro-purple text-white border-0 rounded-full w-auto min-w-[120px] transition-colors">
              <SelectValue placeholder={defaultGenre} />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "time":
        return showTimeFilter && (
          <Select key="time" defaultValue={activeTime} onValueChange={setActiveTime}>
            <SelectTrigger className="bg-clubstro-purple/90 hover:bg-clubstro-purple text-white border-0 rounded-full w-auto min-w-[120px] transition-colors">
              <SelectValue placeholder={defaultTime} />
            </SelectTrigger>
            <SelectContent>
              {times.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-4">
      <div className="flex flex-nowrap items-center justify-start space-x-3 overflow-x-auto">
        {resolvedFilterOrder.map((filterType) => renderFilter(filterType))}
      </div>
    </div>
  );
};

export default FilterBar;
