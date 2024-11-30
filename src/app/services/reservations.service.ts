import { inject, Injectable } from '@angular/core';
import {
  AddReservationUseCaseToken,
  GetReservationByParkingSpotIdAndDateUseCaseToken,
  OnUpdateReservationUseCaseToken,
} from '../app.routes';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Reservation } from '../../../libs/domain/entities/reservation';

@Injectable()
export class ReservationsService {
  private readonly reservationEvent = new BehaviorSubject(EMPTY);

  private readonly onUpdateReservationEvent = inject(
    OnUpdateReservationUseCaseToken
  );

  private readonly getReservationsUseCase = inject(
    GetReservationByParkingSpotIdAndDateUseCaseToken
  );

  private readonly addReservationUseCase = inject(AddReservationUseCaseToken);

  constructor() {
    this.onUpdateReservationEvent.execute(() => {
      this.reservationEvent.next(EMPTY);
    });
  }

  getReservationsByIdAndDate(
    parkingSpotId: string,
    date: Date = new Date()
  ): Observable<Reservation[]> {
    return this.reservationEvent.pipe(
      shareReplay(),
      switchMap(() => {
        return of(this.getReservationsUseCase.execute(parkingSpotId, date));
      })
    );
  }

  addReservation(
    parkingSpotId: string,
    reservationOwner: string,
    date: Date
  ): void {
    this.addReservationUseCase.execute(parkingSpotId, reservationOwner, date);
  }
}
