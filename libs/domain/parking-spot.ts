import { Reservation } from './reservation';

export interface ParkingSpot {
  #id: string;
  #number: number;
  #owner: string;
  #reservations: Reservation[];
}