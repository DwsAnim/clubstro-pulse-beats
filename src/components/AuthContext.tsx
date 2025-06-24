// src/components/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginAPI, registerAPI } from '@/services/api';

type User = { id: number; email: string; name: string };
type PendingUser = { name: string; email: string; password: string; approved: boolean };

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
    const initAuth = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (token && stored) {
        try {
          const parsed: User = JSON.parse(stored);
          setUser(parsed);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const registerUser = async (newUser: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await registerAPI(newUser.name, newUser.email, newUser.password);
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
    } catch {
      setError('Invalid credentials.');
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

  const approveUser = (email: string) => {
    setPendingUsers(u => u.map(x => x.email === email ? {...x, approved: true} : x));
  };

  const rejectUser = (email: string) => {
    setPendingUsers(u => u.filter(x => x.email !== email));
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated, loading, error, user, registerUser, login, logout,
      pendingUsers, approveUser, rejectUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
