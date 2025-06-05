import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/store/AuthContext";
import PublicLayout from "@/components/layout/PublicLayout";
import PrivateLayout from "@/components/layout/PrivateLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import RedirectAfterAuth from "@/components/RedirectAfterAuth";
import Home from "@/pages/home/Home";
import ToolList from "@/pages/tools/ToolsList";
import ToolDetail from "@/pages/tools/ToolDetail";
import MyTools from "@/pages/tools/MyTools";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import HowItWorks from "@/pages/how-it-works/HowItWorks";
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/profile/Profile";
import AddTool from "@/pages/tools/AddTool";
import EditTool from "@/pages/tools/EditTool";
import BookingsPage from "@/pages/BookingsPage";
import MyListings from "@/pages/listing/MyListings";
import BookingDetail from "@/pages/bookings/BookingDetail";
import BookTool from "@/pages/tools/BookTool";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirection de la racine vers /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Routes publiques avec layout */}
          <Route element={<PublicLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/tools" element={<ToolList />} />
            <Route path="/tools/:id" element={<ToolDetail />} />
            <Route path="/my-tools" element={<MyTools />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Route>

          {/* Routes privées protégées par layout global */}
          <Route element={<ProtectedRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tools/add" element={<AddTool />} />
              <Route path="/tools/edit/:id" element={<EditTool />} />
              <Route path="/tools/:id/book" element={<BookTool />} />
              <Route path="/my-bookings" element={<BookingsPage />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/bookings/:id" element={<BookingDetail />} />
            </Route>
          </Route>

          {/* Redirection intelligente selon l'état utilisateur */}
          <Route path="*" element={<RedirectAfterAuth />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
