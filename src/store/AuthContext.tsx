import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "@/services/authService";
import type {
  RegisterFormValues,
  LoginFormValues,
  User,
} from "@/interfaces/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  redirectPath: string | null;
  login: (data: LoginFormValues) => Promise<void>;
  register: (data: RegisterFormValues) => Promise<void>;
  logout: () => void;
  setRedirectPath: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // TODO: récupérer l'utilisateur courant via l'API
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

      // Redirection après connexion
      if (redirectPath) {
        navigate(redirectPath);
        setRedirectPath(null);
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
      setUser(null);
      setToken(null);
      throw err;
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
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setUser(null);
      setToken(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    setRedirectPath(null);
    localStorage.removeItem("token");
    authService.logout();
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        redirectPath,
        login,
        register,
        logout,
        setRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
