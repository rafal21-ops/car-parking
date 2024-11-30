import { Reservation } from '../../domain/entities/reservation';
import { ParkingSpot } from '../../domain/entities/parking-spot';
import { ParkingSpotRepository } from '../../domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { EventBusType } from '../../domain/events/event-bus';
import { ReservationListUpdatedEvent } from '../../domain/events/ReservationListUpdatedEvent';
import { ParkingSpotListUpdatedEvent } from '../../domain/events/ParkingSpotListUpdatedEvent';

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const InMemoryReservations: Reservation[] = [
  new Reservation('1', 'Adam', new Date(), '24242'),
  new Reservation('2', 'Andrzej', new Date(), '424242'),
  new Reservation('3', 'Anna', new Date(), '4242'),
  new Reservation('5', 'Cezary', new Date(), '4242'),
  new Reservation('5', 'Anna', new Date(), '424242'),
  new Reservation('3', 'Cezary', new Date(), '4324242'),
];

export const InMemoryParkingSpots: ParkingSpot[] = [
  new ParkingSpot('1', '111'),
  new ParkingSpot('2', '112'),
  new ParkingSpot('3', '113'),
  new ParkingSpot('4', '114'),
  new ParkingSpot('5', '115'),
];

export class InMemoryParkingSpotRepository implements ParkingSpotRepository {
  constructor(private readonly eventBus: EventBusType) {
    this.eventBus.publish(new ParkingSpotListUpdatedEvent());
  }

  findById(id: string): ParkingSpot | null {
    return InMemoryParkingSpots.find((s) => s.id === id) || null;
  }

  findAll(): ParkingSpot[] {
    return InMemoryParkingSpots;
  }
}

export class InMemoryReservationRepository implements ReservationRepository {
  constructor(private readonly eventBus: EventBusType) {}

  save(reservation: Reservation): void {
    InMemoryReservations.push(reservation);
    this.eventBus.publish(new ReservationListUpdatedEvent());
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
