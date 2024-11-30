import { ParkingSpotRepository } from '../../domain/repositories/parking-spot.repository';
import { ParkingSpot } from '../../domain/entities/parking-spot';

export interface GetAllParkingSpotsUseCaseType {
  execute(): ParkingSpot[];
}

export class GetAllParkingSpotsUseCase implements GetAllParkingSpotsUseCaseType {
  constructor(private readonly repository: ParkingSpotRepository) {}

  execute(): ParkingSpot[] {
    return this.repository.findAll();
  }
}
