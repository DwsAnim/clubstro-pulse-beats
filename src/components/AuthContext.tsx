import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { loginAPI } from '@/services/api';

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
  pendingUsers: PendingUser[];
  registerUser: (user: PendingUser) => void;
  approveUser: (email: string) => void;
  rejectUser: (email: string) => void;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => void;
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
        } catch (parseErr) {
          console.error('User parse error:', parseErr);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Register new user to local pending list
  const registerUser = (newUser: PendingUser) => {
    setPendingUsers((prev) => [...prev, newUser]);
  };

  // Approve user locally (marks as approved)
  const approveUser = (email: string) => {
    setPendingUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, approved: true } : u))
    );
  };

  // Reject user locally (removes them)
  const rejectUser = (email: string) => {
    setPendingUsers((prev) => prev.filter((u) => u.email !== email));
  };

  // Login with mock API and manage session
  const login = async (email: string, password: string, remember = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginAPI(email, password);
      const { token, user } = res;

      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      setUser(user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error(err);
      setError('Invalid credentials.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        error,
        user,
        login,
        logout,
        pendingUsers,
        registerUser,
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
