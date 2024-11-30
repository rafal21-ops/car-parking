import { Reservation } from '../entities/reservation';
import { Observable } from 'rxjs';

export interface ReservationRepository {
  save(reservation: Reservation): void;
  findById(id: string): Reservation | null;
  findAll(): Reservation[];
  findAll$(): Observable<Reservation[]>;
  findByParkingSpotId(parkingSpotId: string): Reservation[];
  findByParkingSpotIdAndDate(parkingSpotId: string, date: Date): Reservation[];
}