import { ParkingSpot } from './parking-spot';

describe('ParkingSpotEntity', () => {
  it('should create an instance with given id and number', () => {
    const id = '1';
    const number = '142';
    const parkingSpot = new ParkingSpot(id, number);

    expect(parkingSpot).toBeInstanceOf(ParkingSpot);
    expect(parkingSpot.id).toBe(id);
    expect(parkingSpot.number).toBe(number);
  });

  it('should have id and number as string properties', () => {
    const parkingSpot = new ParkingSpot('1', '142');

    expect(typeof parkingSpot.id).toBe('string');
    expect(typeof parkingSpot.number).toBe('string');
  });
});