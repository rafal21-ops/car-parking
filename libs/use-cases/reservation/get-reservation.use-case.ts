import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';

export class GetReservationUseCase {
  constructor(private readonly reservations: ReservationsPort) {}

  getById(id: string): ReservationEntity | null {
    return this.reservations.get(id);
  }

  getAll(): ReservationEntity[] {
    return this.reservations.getAllReservations();
  }

  addReservation(parkingSpotId: string, user: string, date: Date): void {
    const reservation = new ReservationEntity(parkingSpotId, user, date, '');
    this.reservations.add(reservation);
  }


}
