import { Reservation } from '../../domain/entities/reservation';
import { ParkingSpot } from '../../domain/entities/parking-spot';
import { ParkingSpotRepository } from '../../domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const InMemoryReservations: Reservation[] = [
  new Reservation('1', 'Adam', new Date('2024-11-16T10:00:00'), '24242'),
  new Reservation('2', 'Andrzej', new Date('2024-11-16T11:00:00'), '424242'),
  new Reservation('3', 'Anna', new Date('2024-11-16T12:00:00'), '4242'),
  new Reservation('5', 'Cezary', new Date('2024-11-16T14:00:00'), '4242'),
  new Reservation('3', 'Anna', new Date('2024-11-17T12:00:00'), '424242'),
  new Reservation('5', 'Cezary', new Date('2024-11-17T14:00:00'), '4324242'),
];

export const InMemoryParkingSpots: ParkingSpot[] = [
  new ParkingSpot('1', '111'),
  new ParkingSpot('2', '112'),
  new ParkingSpot('3', '113'),
  new ParkingSpot('4', '114'),
  new ParkingSpot('5', '115'),
];

export class InMemoryParkingSpotRepository implements ParkingSpotRepository {
  findById(id: string): ParkingSpot | null {
    return InMemoryParkingSpots.find((s) => s.id === id) || null;
  }

  findAll(): ParkingSpot[] {
    return InMemoryParkingSpots;
  }
}

export class InMemoryReservationRepository implements ReservationRepository {
  save(reservation: Reservation): void {
    InMemoryReservations.push(reservation);
  }

  findById(id: string): Reservation | null {
    return (
      InMemoryReservations.find((res: Reservation) => res.id === id) || null
    );
  }

  findAll(): Reservation[] {
    return InMemoryReservations;
  }

  findByParkingSpotId(parkingSpotId: string): Reservation[] {
    return InMemoryReservations.filter(
      (res: Reservation) => res.spotId === parkingSpotId
    );
  }

  findByParkingSpotIdAndDate(parkingSpotId: string, date: Date): Reservation[] {
    return InMemoryReservations.filter(
      (reservation: Reservation) =>
        reservation.spotId === parkingSpotId && sameDay(reservation.date, date)
    );
  }
}
