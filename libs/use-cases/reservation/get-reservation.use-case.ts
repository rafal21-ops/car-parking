import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

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

  async isParkingSpotFree(parkingSpotId: string, date: Date = new Date()): Promise<boolean> {
    const reservations = await this.reservations.getByParkingSpotId(parkingSpotId);
    return !reservations.some((reservation) => sameDay(reservation.date, date));
  }
}
