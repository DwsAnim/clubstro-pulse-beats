import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@/components/AuthContext";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-gray-900 text-gray-50 flex justify-between items-center">
        <Navbar />
        {isAuthenticated && (
          <button onClick={logout} className="p-2 bg-red-500 rounded">
            Logout
          </button>
        )}

      </header>

      <main className="mt-16 flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
