import { ParkingSpotEntity } from './parking-spot.entity';

describe('ParkingSpotEntity', () => {
  it('should create an instance with given id and number', () => {
    const id = '1';
    const number = '142';
    const parkingSpot = new ParkingSpotEntity(id, number);

    expect(parkingSpot).toBeInstanceOf(ParkingSpotEntity);
    expect(parkingSpot.id).toBe(id);
    expect(parkingSpot.number).toBe(number);
  });

  it('should have id and number as string properties', () => {
    const parkingSpot = new ParkingSpotEntity('1', '142');

    expect(typeof parkingSpot.id).toBe('string');
    expect(typeof parkingSpot.number).toBe('string');
  });
});