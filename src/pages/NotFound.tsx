
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-clubstro-dark px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-400 mb-6">Oops! This page doesn't exist</p>
        <Link to="/">
          <Button className="bg-clubstro-blue hover:bg-clubstro-blue/90">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
