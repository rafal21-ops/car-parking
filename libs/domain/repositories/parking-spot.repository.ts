import { ParkingSpot } from '../entities/parking-spot';

export interface ParkingSpotRepository {
  findById(id: string): Promise<ParkingSpot | null>;
  findAll(): Promise<ParkingSpot[]>;
}