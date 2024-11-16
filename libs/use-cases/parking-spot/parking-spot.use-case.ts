import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';

export interface ParkingSpotPort {
  getAll(): ParkingSpotEntity[];
}

export class ParkingSpotUseCase {
  parkingSpots: ParkingSpotEntity[] = [];

  private portDb!: ParkingSpotPort;

  constructor() {
    this.parkingSpots = [
      new ParkingSpotEntity('1', '111'),
      new ParkingSpotEntity('2', '112'),
      new ParkingSpotEntity('3', '113'),
    ];
  }

  init(db: ParkingSpotPort) {
    this.portDb = db;
  }

  getAll(): ParkingSpotEntity[] {
    return this.portDb.getAll();
  }

  getById(id: string): ParkingSpotEntity | undefined {
    return this.parkingSpots.find((parkingSpot: ParkingSpotEntity) => {
      return parkingSpot.id === id;
    });
  }
}
