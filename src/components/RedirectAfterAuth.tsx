import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";

export default function RedirectAfterAuth() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/auth/login" replace />;
}
