import { Reservation } from '../entities/reservation';

export interface ReservationRepository {
  save(reservation: Reservation): void;
  findById(id: string): Reservation | null;
  findAll(): Reservation[];
  findByParkingSpotId(parkingSpotId: string): Reservation[];
  findByParkingSpotIdAndDate(parkingSpotId: string, date: Date): Reservation[];
}