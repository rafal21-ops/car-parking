import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';

export interface ParkingSpotUseCasePort {
  getAll(): ParkingSpotEntity[];
}

export class ParkingSpotUseCase {
  constructor(private readonly parkingSpots: ParkingSpotsPort) {}

  getAll(): ParkingSpotEntity[] {
    return this.parkingSpots.getAllParkingSpots();
  }
}
