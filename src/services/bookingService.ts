import {
  Booking,
  CreateBookingDto,
  UpdateBookingDto,
  BookingStatus,
  PaymentStatus,
} from "@/interfaces/Booking";

class BookingService {
  private bookings: Booking[] = [];

  // Simuler un délai réseau
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async createBooking(data: CreateBookingDto): Promise<Booking> {
    await this.delay(1000);

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      userId: "user-1", // Simuler l'utilisateur connecté
      toolId: data.toolId,
      startDate: data.startDate,
      endDate: data.endDate,
      status: BookingStatus.PENDING,
      totalPrice: this.calculatePrice(data.startDate, data.endDate),
      createdAt: new Date(),
      updatedAt: new Date(),
      paymentStatus: PaymentStatus.PENDING,
      notes: data.notes,
    };

    this.bookings.push(newBooking);
    return newBooking;
  }

  async getBookings(): Promise<Booking[]> {
    await this.delay(500);
    return this.bookings;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    await this.delay(300);
    return this.bookings.find((booking) => booking.id === id);
  }

  async getUserBookings(email: string): Promise<Booking[]> {
    await this.delay(500);
    return this.bookings.filter((booking) => booking.userId === email);
  }

  async updateBooking(
    id: string,
    data: UpdateBookingDto
  ): Promise<Booking | undefined> {
    await this.delay(800);
    const index = this.bookings.findIndex((booking) => booking.id === id);

    if (index === -1) return undefined;

    const currentBooking = this.bookings[index];
    const updatedBooking: Booking = {
      ...currentBooking,
      ...data,
      updatedAt: new Date(),
    };

    this.bookings[index] = updatedBooking;
    return updatedBooking;
  }

  async cancelBooking(id: string): Promise<Booking | undefined> {
    return this.updateBooking(id, {
      status: BookingStatus.CANCELLED,
      paymentStatus: PaymentStatus.REFUNDED,
    });
  }

  private calculatePrice(startDate: Date, endDate: Date): number {
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const basePrice = 5000; // Prix de base par jour
    return days * basePrice;
  }
}

export const bookingService = new BookingService();
