import { ParkingSpotEntity } from '../entities/parking-spot.entity';

export interface ParkingSpotsPort {
  getAllParkingSpots(): Promise<ParkingSpotEntity[]>;
}