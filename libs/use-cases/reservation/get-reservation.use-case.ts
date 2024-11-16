import { ReservationEntity } from '../../domain/entities/reservation.entity';


export class GetReservationUseCase {

  getById(id: string, reservations: ReservationEntity[]): ReservationEntity | null {
    return reservations.find((reservation) => reservation.id === id) ?? null;
  }


}