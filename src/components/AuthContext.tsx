import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginAPI } from "@/services/api";

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");

      if (token && storedUser && storedUser !== "undefined") {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setIsAuthenticated(true);
        } catch (parseErr) {
          console.error("User parse error:", parseErr);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, remember = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAPI(email, password);
      const { token, user } = res;

      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      setUser(user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error(err);
      setError("Invalid credentials.");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, error, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
