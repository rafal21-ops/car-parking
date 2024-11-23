import { Reservation } from '../entities/reservation';

export interface ReservationRepository {
  save(reservation: Reservation): Promise<void>;
  findById(id: string): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>;
  findByParkingSpotId(parkingSpotId: string): Promise<Reservation[]>;
}