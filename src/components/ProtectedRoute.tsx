import { useAuth } from "@/store/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Sauvegarder l'URL de redirection dans le localStorage
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
