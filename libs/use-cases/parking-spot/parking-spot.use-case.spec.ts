import { ParkingSpotUseCase } from './parking-spot.use-case';
import { ParkingSpotsPort } from '../../domain/abstracts/parking-spots.port';
import { ParkingSpotEntity } from '../../domain/entities/parking-spot.entity';

describe('ParkingSpotUseCase', () => {
  let parkingSpotUseCase: ParkingSpotUseCase;
  let parkingSpotsPortMock: jest.Mocked<ParkingSpotsPort>;

  beforeEach(() => {
    parkingSpotsPortMock = {
      getAllParkingSpots: jest.fn(),
    };
    parkingSpotUseCase = new ParkingSpotUseCase(parkingSpotsPortMock);
  });

  it('should return all parking spots', () => {
    const parkingSpots: ParkingSpotEntity[] = [
      { id: "1", number: "142" },
      { id: "2", number: "143" },
    ];
    parkingSpotsPortMock.getAllParkingSpots.mockReturnValue(parkingSpots);

    const result = parkingSpotUseCase.getAll();

    expect(result).toEqual(parkingSpots);
    expect(parkingSpotsPortMock.getAllParkingSpots).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if no parking spots are available', () => {
    parkingSpotsPortMock.getAllParkingSpots.mockReturnValue([]);

    const result = parkingSpotUseCase.getAll();

    expect(result).toEqual([]);
    expect(parkingSpotsPortMock.getAllParkingSpots).toHaveBeenCalledTimes(1);
  });
});