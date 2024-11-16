import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ReservationsPort } from '../../domain/abstracts/reservationsPort';

export class GetReservationUseCase {
  constructor(private readonly reservations: ReservationsPort) {}

  getById(id: string): ReservationEntity {
    return this.reservations.get(id);
  }

  addReservation(parkingSpotId: string, user: string, date: Date): void {
    const reservation = new ReservationEntity(parkingSpotId, user, date);
    this.reservations.add(reservation);
  }
}
