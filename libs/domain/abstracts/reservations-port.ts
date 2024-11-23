import { Reservation } from '../entities/reservation';

export interface ReservationsPort {
  getAllReservations(): Reservation[];
  get(id: string): Reservation | null;
  getByParkingSpotId(id: string): Reservation[];
  add(reservation: Reservation): void;
  remove(reservation: Reservation): void;
}