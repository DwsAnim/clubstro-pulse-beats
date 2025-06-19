
import { Link } from "react-router-dom";
import { Home, BarChart2, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-clubstro-dark-gray border-t border-white/10 z-40 md:hidden">
      <div className="flex items-center justify-around">
        <Link to="/index" className="flex flex-col items-center py-3 px-4 text-white">
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/" className="flex flex-col items-center py-3 px-4 text-white">
          <BarChart2 size={20} />
          <span className="text-xs mt-1">Charts</span>
        </Link>
        
        <Link to="/events" className="flex flex-col items-center py-3 px-4 text-white">
          <Calendar size={20} />
          <span className="text-xs mt-1">Events</span>
        </Link>

        <div className="flex flex-col items-center py-3 px-4 text-white">
          <ThemeToggle />
          <span className="text-xs mt-1">Theme</span>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
