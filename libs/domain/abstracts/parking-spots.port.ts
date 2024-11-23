import { ParkingSpot } from '../entities/parking-spot';

export interface ParkingSpotsPort {
  getAllParkingSpots(): ParkingSpot[];
}