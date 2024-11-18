import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';
import { v4 as uuidv4 } from 'uuid';

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export interface GetReservationUseCasePort {
  getById(id: string): ReservationEntity | null;
  getAll(): ReservationEntity[];
  addReservation(parkingSpotId: string, user: string, date: Date): void;
  isParkingSpotFree(parkingSpotId: string, date: Date): boolean;
  getLastReservationOwner(parkingSpotId: string, date: Date): string;
  getLastReservationDate(parkingSpotId: string, date: Date): Date;
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
    const reservation = new ReservationEntity(
      parkingSpotId,
      user,
      date,
      uuidv4()
    );
    this.reservations.add(reservation);
  }

  isParkingSpotFree(parkingSpotId: string, date: Date = new Date()): boolean {
    const reservations = this.reservations.getByParkingSpotId(parkingSpotId);
    return !reservations.some((reservation) => sameDay(reservation.date, date));
  }

  getLastReservationOwner(
    parkingSpotId: string,
    date: Date = new Date()
  ): string {
    return (
      this.reservations
        .getAllReservations()
        .filter(
          (reservation) =>
            reservation.spotId === parkingSpotId &&
            sameDay(reservation.date, date)
        )
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .at(-1)?.user || '?'
    );
  }

  getLastReservationDate(parkingSpotId: string, date: Date = new Date()): Date {
    return (
      this.reservations
        .getAllReservations()
        .filter(
          (reservation) =>
            reservation.spotId === parkingSpotId &&
            sameDay(reservation.date, date)
        )
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .at(-1)?.date || new Date()
    );
  }
}
