import { useState, useEffect, useCallback } from "react";
import { useBooking } from "@/hooks/useBooking";
import { useAuth } from "@/store/AuthContext";
import { Booking, BookingStatus, PaymentStatus } from "@/interfaces/Booking";
import BookingList from "@/components/bookings/BookingList";
import { BookingDetails } from "@/components/bookings/BookingDetails";
import { Button } from "@/components/ui/Button/Button";
import {
  Calendar,
  Filter,
  Loader2,
  Search,
  ArrowUpDown,
  Banknote,
  Clock,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SortField = "date" | "price" | "status";
type SortOrder = "asc" | "desc";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function BookingsPage() {
  const { user } = useAuth();
  const { getUserBookings } = useBooking();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "ALL">(
    "ALL"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loadBookings = useCallback(async () => {
    if (user) {
      try {
        const data = await getUserBookings(user.email);
        setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setIsInitialLoading(false);
      }
    }
  }, [user, getUserBookings]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleBookingSelect = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "ALL" || booking.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      booking.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.toolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    switch (sortField) {
      case "date":
        return (
          multiplier *
          (new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        );
      case "price":
        return multiplier * (a.totalPrice - b.totalPrice);
      case "status":
        return multiplier * a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const stats = {
    total: bookings.length,
    totalValue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    byStatus: bookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {} as Record<BookingStatus, number>),
    byPaymentStatus: bookings.reduce((acc, booking) => {
      acc[booking.paymentStatus] = (acc[booking.paymentStatus] || 0) + 1;
      return acc;
    }, {} as Record<PaymentStatus, number>),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
                Mes Réservations
              </h1>
              <p className="text-gray-500 mt-2">
                Gérez vos réservations d'outils en toute simplicité
              </p>
            </div>

            {isInitialLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Chargement des réservations...</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {/* Barre de recherche */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-64 h-11 pl-10 pr-4 rounded-lg border ${
                      isSearchFocused ? "border-primary" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200`}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Bouton de tri */}
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSortOpen(!isSortOpen);
                      setIsFilterOpen(false);
                    }}
                    className="flex items-center gap-2 min-w-[140px] h-11 hover:bg-gray-50 transition-all duration-200"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    <span>Trier par</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg p-2 z-10 border border-gray-100"
                      >
                        <button
                          onClick={() => {
                            setSortField("date");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 ${
                            sortField === "date"
                              ? "bg-primary text-white"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          Par date
                        </button>
                        <button
                          onClick={() => {
                            setSortField("price");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 ${
                            sortField === "price"
                              ? "bg-primary text-white"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <Banknote className="w-4 h-4" />
                          Par prix
                        </button>
                        <button
                          onClick={() => {
                            setSortField("status");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 ${
                            sortField === "status"
                              ? "bg-primary text-white"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Par statut
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bouton de filtre */}
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsFilterOpen(!isFilterOpen);
                      setIsSortOpen(false);
                    }}
                    className="flex items-center gap-2 min-w-[140px] h-11 hover:bg-gray-50 transition-all duration-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtrer</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isFilterOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg p-2 z-10 border border-gray-100"
                      >
                        <button
                          onClick={() => {
                            setStatusFilter("ALL");
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center justify-between ${
                            statusFilter === "ALL"
                              ? "bg-primary text-white"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span>Toutes</span>
                          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                            {bookings.length}
                          </span>
                        </button>
                        {Object.values(BookingStatus).map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setStatusFilter(status);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center justify-between ${
                              statusFilter === status
                                ? "bg-primary text-white"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <span>{status}</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                              {stats.byStatus[status] || 0}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-gray-900">Total Réservations</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Banknote className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-gray-900">Valeur Totale</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalValue.toLocaleString("fr-FR")} FCFA
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-gray-900">Confirmées</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.byStatus.CONFIRMED || 0}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-gray-900">En attente</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {stats.byStatus.PENDING || 0}
            </p>
          </motion.div>
        </motion.div>

        {/* Liste des réservations et détails */}
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-gray-500">Chargement des réservations...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <BookingList
                bookings={sortedBookings}
                onBookingSelect={handleBookingSelect}
                selectedBookingId={selectedBooking?.id}
              />
            </div>
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {selectedBooking ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BookingDetails
                      booking={selectedBooking}
                      onClose={() => setSelectedBooking(null)}
                      onUpdate={(updatedBooking: Booking) => {
                        setSelectedBooking(updatedBooking);
                        loadBookings();
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-gray-100"
                  >
                    <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucune réservation sélectionnée
                    </h3>
                    <p className="text-gray-500">
                      Sélectionnez une réservation pour voir les détails
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
