import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";

export default function PrivateLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // Masquer la navbar sur /tools/add et /tools/edit et leurs sous-routes
  const hideHeader =
    location.pathname.startsWith("/tools/add") ||
    location.pathname.startsWith("/tools/edit");

  return (
    <div className="min-h-screen flex flex-col bg-light">
      {!hideHeader && (
        <header className="flex items-center justify-between px-8 py-4 bg-primary text-white shadow-waouh">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-2xl font-bold tracking-tight">
              TechShare
            </Link>
            <nav className="flex gap-4 text-base">
              <Link to="/tools" className="hover:underline">
                Outils
              </Link>
              <Link to="/my-rentals" className="hover:underline">
                Mes réservations
              </Link>
              <Link to="/my-listings" className="hover:underline">
                Mes annonces
              </Link>
              <Link to="/profile" className="hover:underline">
                Profil
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-danger hover:bg-danger/80 px-4 py-2 rounded-xl font-semibold transition-all"
            >
              Déconnexion
            </button>
          </div>
        </header>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
