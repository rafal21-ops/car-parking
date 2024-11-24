import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { Reservation } from '../../domain/entities/reservation';
import { v4 as uuidv4 } from 'uuid';

export interface AddReservationUseCaseType {
  execute(parkingSpotId: string, user: string, date: Date): void;
}

export class AddReservationUseCase implements AddReservationUseCaseType {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  execute(parkingSpotId: string, user: string, date: Date): void {
    const reservation = new Reservation(
      parkingSpotId,
      user,
      date,
      uuidv4()
    );

    return this.reservationRepository.save(reservation);
  }
}
