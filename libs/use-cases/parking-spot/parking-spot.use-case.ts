import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';

export class ParkingSpotUseCase {
  constructor(private readonly parkingSpots: ParkingSpotsPort) {}

  async getAll(): Promise<ParkingSpotEntity[]> {
    return await this.parkingSpots.getAllParkingSpots();
  }
}
