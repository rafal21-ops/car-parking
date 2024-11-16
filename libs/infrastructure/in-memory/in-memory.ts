import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ReservationsPort } from '../../domain/abstracts/reservations-port';

export const InMemoryReservations: ReservationEntity[] = [
  new ReservationEntity('1', 'Adam', new Date('2024-11-16T10:00:00'), '1'),
  new ReservationEntity('2', 'Andrzej', new Date('2024-11-16T11:00:00'), '2'),
  new ReservationEntity('3', 'Anna', new Date('2024-11-16T12:00:00'), '3'),
  new ReservationEntity('5', 'Cezary', new Date('2024-11-16T14:00:00'), '5'),
];

export const InMemoryParkingSpots: ParkingSpotEntity[] = [
  new ParkingSpotEntity('1', '111'),
  new ParkingSpotEntity('2', '112'),
  new ParkingSpotEntity('3', '113'),
  new ParkingSpotEntity('4', '114'),
  new ParkingSpotEntity('5', '115'),
];

export class InMemoryDataProvider implements ParkingSpotsPort, ReservationsPort {
  reservations: ReservationEntity[] = InMemoryReservations;
  parkingSpots: ParkingSpotEntity[] = InMemoryParkingSpots;

  get(id: string): ReservationEntity | null {
    return (
      this.reservations.find((reservation: ReservationEntity) => {
        return reservation.id === id;
      }) || null
    );
  }

  add(reservation: ReservationEntity): void {
    this.reservations.push(reservation);
  }

  remove(reservationToRemove: ReservationEntity): void {
    this.reservations = this.reservations.filter(
      (reservation: ReservationEntity) => {
        return reservation.id !== reservationToRemove.id;
      }
    );
  }

  getAllReservations(): ReservationEntity[] {
    return this.reservations;
  }

  getAllParkingSpots(): ParkingSpotEntity[] {
    console.log('Getting parking spots from memory');
    return this.parkingSpots;
  }

  getByParkingSpotId(id: string): ReservationEntity[] {
    console.log('Getting reservations from memory');
    return this.reservations.filter(reservation => reservation.spotId === id);
  }
}
