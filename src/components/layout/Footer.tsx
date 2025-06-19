
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10 mt-auto">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold text-white mb-2">
              Club<span className="text-clubstro-blue">stro</span>
            </span>
            <p className="text-gray-400 text-sm">
              The ultimate destination for club music enthusiasts
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link to="/charts" className="text-gray-400 hover:text-white">Charts</Link>
            <Link to="/events" className="text-gray-400 hover:text-white">Events</Link>
            <Link to="#" className="text-gray-400 hover:text-white">Privacy</Link>
            <Link to="#" className="text-gray-400 hover:text-white">Terms</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Clubstro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
