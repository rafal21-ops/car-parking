import { ParkingSpot } from '../entities/parking-spot';

export interface ParkingSpotRepository {
  findById(id: string): ParkingSpot | null;
  findAll(): ParkingSpot[];
}