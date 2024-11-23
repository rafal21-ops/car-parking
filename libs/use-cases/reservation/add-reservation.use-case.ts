import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { Reservation } from '../../domain/entities/reservation';

export interface AddReservationUseCaseType {
  execute(reservation: Reservation): Promise<void>;
}

export class AddReservationUseCase implements AddReservationUseCaseType {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  execute(reservation: Reservation): Promise<void> {
    return this.reservationRepository.save(reservation);
  }
}
