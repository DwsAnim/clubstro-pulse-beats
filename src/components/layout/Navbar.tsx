
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart2, Mail, Twitter, Instagram } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-clubstro-dark border-b border-white/10 px-4 py-3 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">
            Club<span className="text-clubstro-blue">stro</span>
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10 hidden md:flex"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Charts
            </Button>
          </Link>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-clubstro-dark border-white/10">
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@clubstro.com</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Twitter className="h-4 w-4 mr-2" />
                <span>@clubstro</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Instagram className="h-4 w-4 mr-2" />
                <span>@clubstro.official</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
