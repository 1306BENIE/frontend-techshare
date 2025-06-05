import {
  Reservation,
  ReservationStatus,
  PaymentStatus,
} from "../interfaces/Reservation";

export const mockReservations: Reservation[] = [
  {
    id: "res-1",
    userId: "user-1",
    toolId: "tool-1",
    startDate: new Date("2024-03-20"),
    endDate: new Date("2024-03-25"),
    status: ReservationStatus.CONFIRMED,
    totalPrice: 25000,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    paymentStatus: PaymentStatus.PAID,
  },
  {
    id: "res-2",
    userId: "user-2",
    toolId: "tool-2",
    startDate: new Date("2024-03-22"),
    endDate: new Date("2024-03-24"),
    status: ReservationStatus.PENDING,
    totalPrice: 10000,
    createdAt: new Date("2024-03-16"),
    updatedAt: new Date("2024-03-16"),
    paymentStatus: PaymentStatus.PENDING,
  },
];
