import { ParkingSpotEntity } from '../entities/parking-spot.entity';

export interface ParkingSpotsPort {
  getAllParkingSpots(): ParkingSpotEntity[];
}