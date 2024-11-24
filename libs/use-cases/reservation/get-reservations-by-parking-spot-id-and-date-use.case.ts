import { Reservation } from '../../domain/entities/reservation';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';

export interface GetReservationByParkingSpotIdAndDateUseCaseType {
  execute(parkingSpotId: string, date: Date): Reservation[];
}

export class GetReservationsByParkingSpotIdAndDateUseCase
  implements GetReservationByParkingSpotIdAndDateUseCaseType
{
  constructor(private readonly reservationRepository: ReservationRepository) {}

  execute(parkingSpotId: string, date: Date = new Date()): Reservation[] {
    return this.reservationRepository.findByParkingSpotIdAndDate(parkingSpotId, date);
  }
}
