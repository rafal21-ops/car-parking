import { ReservationEntity } from '../../domain/entities/reservation.entity';


export class AddReservationUseCase {

  constructor() {}

  add(spotId: number, user: string, date: Date) {
      const newReservation = new ReservationEntity('')
  }
}