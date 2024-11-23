import { Reservation } from '../../domain/entities/reservation';
import { ParkingSpot } from '../../domain/entities/parking-spot';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';
import { ParkingSpotRepository } from '../../domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';

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
  findById(id: string): Promise<ParkingSpot | null> {
    const partingSpot = InMemoryParkingSpots.find((s) => s.id === id) || null;
    return Promise.resolve(partingSpot);
  }

  findAll(): Promise<ParkingSpot[]> {
    return Promise.resolve(InMemoryParkingSpots);
  }
}

export class InMemoryReservationRepository implements ReservationRepository {
  save(reservation: Reservation): Promise<void> {
    InMemoryReservations.push(reservation);
    return Promise.resolve();
  }

  findById(id: string): Promise<Reservation | null> {
    return Promise.resolve(InMemoryReservations.find((res: Reservation) => res.id === id) || null);
  }

  findAll(): Promise<Reservation[]> {
    return Promise.resolve(InMemoryReservations);
  }

  findByParkingSpotId(parkingSpotId: string): Promise<Reservation[]> {
    return Promise.resolve(InMemoryReservations.filter((res: Reservation) => res.spotId === parkingSpotId));
  }
}

export class InMemoryDataProvider
  implements ParkingSpotsPort, ReservationsPort
{
  reservations: Reservation[] = InMemoryReservations;
  parkingSpots: ParkingSpot[] = InMemoryParkingSpots;

  get(id: string): Reservation | null {
    return (
      this.reservations.find((reservation: Reservation) => {
        return reservation.id === id;
      }) || null
    );
  }

  add(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  remove(reservationToRemove: Reservation): void {
    this.reservations = this.reservations.filter((reservation: Reservation) => {
      return reservation.id !== reservationToRemove.id;
    });
  }

  getAllReservations(): Reservation[] {
    return this.reservations;
  }

  getAllParkingSpots(): ParkingSpot[] {
    console.log('Getting parking spots from memory');
    return this.parkingSpots;
  }

  getByParkingSpotId(id: string): Reservation[] {
    console.log('Getting reservations from memory');
    return this.reservations.filter((reservation) => reservation.spotId === id);
  }
}
