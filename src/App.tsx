import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/store/AuthContext";
import PrivateLayout from "@/components/layout/PrivateLayout";

// Pages publiques
import Home from "@/pages/home/Home";
import ToolList from "@/pages/tools/ToolsList";
import ToolDetail from "@/pages/tools/ToolDetail";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Pages privées
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/profile/Profile";
import AddTool from "@/pages/tool/AddTool";
import MyBookings from "@/pages/booking/MyBookings";
import BookingDetail from "@/pages/booking/BookingDetail";
import MyListings from "@/pages/listing/MyListings";

// ProtectedRoute (à créer si pas déjà fait)
import ProtectedRoute from "@/components/ProtectedRoute";

// Redirection intelligente après login/register
function RedirectAfterAuth() {
  const { user } = useAuth();
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/auth/login" replace />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<ToolList />} />
          <Route path="/tools/:id" element={<ToolDetail />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Routes privées protégées par layout global */}
          <Route element={<ProtectedRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tools/add" element={<AddTool />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/bookings/:id" element={<BookingDetail />} />
            </Route>
          </Route>

          {/* Redirection intelligente selon l'état utilisateur */}
          <Route path="*" element={<RedirectAfterAuth />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
