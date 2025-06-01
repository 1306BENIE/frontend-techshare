import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as authService from "@/services/authService";
import type { RegisterFormValues, LoginFormValues } from "@/interfaces/auth";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  // Ajoute d'autres champs si besoin
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginFormValues) => Promise<void>;
  register: (data: RegisterFormValues) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      // TODO: récupérer l'utilisateur courant via l'API si besoin
      // fetchCurrentUser(token).then(setUser).catch(() => logout());
    }
  }, [token]);

  const login = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(data);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(res.user);
    } catch (err: any) {
      setError(err.message);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register(data);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(res.user);
    } catch (err: any) {
      setError(err.message);
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    authService.logout();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
