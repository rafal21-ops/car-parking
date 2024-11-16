import { ReservationEntity } from '../../domain/entities/reservation.entity';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotPort } from '../../use-cases/parking-spot/parking-spot.use-case';
import { ReservationsPort } from '../../domain/abstracts/reservationsPort';

export const InMemoryReservations: ReservationEntity[] = [
  new ReservationEntity('1', 'Adam', new Date()),
  new ReservationEntity('2', 'Andrzej', new Date()),
  new ReservationEntity('3', 'Anna', new Date()),
  new ReservationEntity('4', 'Barbara', new Date()),
  new ReservationEntity('5', 'Cezary', new Date()),
  new ReservationEntity('6', 'Dominika', new Date()),
  new ReservationEntity('7', 'Edward', new Date()),
  new ReservationEntity('8', 'Franciszek', new Date()),
  new ReservationEntity('9', 'Gabriela', new Date()),
  new ReservationEntity('10', 'Helena', new Date()),
  new ReservationEntity('11', 'Igor', new Date()),
  new ReservationEntity('12', 'Jakub', new Date()),
  new ReservationEntity('13', 'Katarzyna', new Date()),
  new ReservationEntity('14', 'Leon', new Date()),
  new ReservationEntity('15', 'Marta', new Date()),
  new ReservationEntity('16', 'Nina', new Date()),
  new ReservationEntity('17', 'Oskar', new Date()),
  new ReservationEntity('18', 'Paulina', new Date()),
  new ReservationEntity('19', 'Rafał', new Date()),
  new ReservationEntity('20', 'Zofia', new Date()),
];

export const InMemoryParkingSpots: ParkingSpotEntity[] = [
  new ParkingSpotEntity('1', '111'),
  new ParkingSpotEntity('2', '112'),
  new ParkingSpotEntity('3', '113'),
  new ParkingSpotEntity('4', '114'),
  new ParkingSpotEntity('5', '115'),
  new ParkingSpotEntity('6', '116'),
  new ParkingSpotEntity('7', '117'),
  new ParkingSpotEntity('8', '118'),
  new ParkingSpotEntity('9', '119'),
  new ParkingSpotEntity('10', '120'),
  new ParkingSpotEntity('11', '121'),
  new ParkingSpotEntity('12', '122'),
  new ParkingSpotEntity('13', '123'),
  new ParkingSpotEntity('14', '124'),
  new ParkingSpotEntity('15', '125'),
  new ParkingSpotEntity('16', '126'),
  new ParkingSpotEntity('17', '127'),
  new ParkingSpotEntity('18', '128'),
  new ParkingSpotEntity('19', '129'),
  new ParkingSpotEntity('20', '130'),
];

export class InMemoryClass implements ParkingSpotPort, ReservationsPort {
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

  getAll(): ParkingSpotEntity[] {
    return this.parkingSpots;
  }
}
