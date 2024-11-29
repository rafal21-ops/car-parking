import { ParkingSpotRepository } from '../../domain/repositories/parking-spot.repository';
import { ParkingSpot } from '../../domain/entities/parking-spot';
import { Observable } from 'rxjs';

export interface GetAllParkingSpotsUseCaseType {
  execute(): ParkingSpot[];
  execute$(): Observable<ParkingSpot[]>;
}

export class GetAllParkingSpotsUseCase implements GetAllParkingSpotsUseCaseType {
  constructor(private readonly repository: ParkingSpotRepository) {}

  execute(): ParkingSpot[] {
    return this.repository.findAll();
  }

  execute$(): Observable<ParkingSpot[]> {
    return this.repository.findAll$();
  }
}
