import { ReservationEntity } from './reservation.entity';

export class ParkingSpotEntity {
  #id: string;
  #number: number;
  #owner: string;
  #reservations: ReservationEntity[];
}