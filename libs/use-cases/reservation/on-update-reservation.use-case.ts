import { ReservationRepository } from '../../domain/repositories/reservation.repository';

export interface OnUpdateReservationUseCaseType {
  execute(callback: () => void): void;
}

export class OnUpdateReservationUseCase implements OnUpdateReservationUseCaseType {
  constructor(private readonly reservations: ReservationRepository) {
  }

  execute(callback: () => void): void {
    this.reservations.findAll$().subscribe(() => {
      callback();
    })
  }
}