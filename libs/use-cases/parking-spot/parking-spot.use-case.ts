import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';

export class ParkingSpotUseCase {
  parkingSpots: ParkingSpotEntity[] = [];

  constructor() {
    this.parkingSpots = [
      new ParkingSpotEntity('1', '111'),
      new ParkingSpotEntity('2', '112'),
      new ParkingSpotEntity('3', '113'),
    ];
  }

  getAll(): ParkingSpotEntity[] {
    return this.parkingSpots;
  }

  getById(id: string): ParkingSpotEntity | undefined {
    return this.parkingSpots.find((parkingSpot: ParkingSpotEntity) => {
      return parkingSpot.id === id;
    });
  }
}
