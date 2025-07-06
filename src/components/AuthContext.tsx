import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { loginAPI, registerAPI } from '@/services/api';

type User = {
  id: number;
  email: string;
  name: string;
};

type PendingUser = {
  name: string;
  email: string;
  password: string;
  approved: boolean;
};

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
  registerUser: (user: { name: string; email: string; password: string }) => Promise<void>;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => void;

  pendingUsers: PendingUser[];
  approveUser: (email: string) => void;
  rejectUser: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

  useEffect(() => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

      if (token && storedUser && storedUser !== 'undefined') {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('User parse error:', err);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await registerAPI(name, email, password);
    } catch (err) {
      console.error('Registration failed:', err);
      throw new Error('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, remember = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAPI(email, password);
      const { token, user } = res;

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('user', JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
  };

  const approveUser = (email: string) => {
    setPendingUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, approved: true } : u))
    );
  };

  const rejectUser = (email: string) => {
    setPendingUsers((prev) => prev.filter((u) => u.email !== email));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        user,
        registerUser,
        login,
        logout,
        pendingUsers,
        approveUser,
        rejectUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
