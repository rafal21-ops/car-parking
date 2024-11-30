import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Reservation } from '../../../libs/domain/entities/reservation';
import {
  AddReservationUseCaseToken,
  GetReservationByParkingSpotIdAndDateUseCaseToken,
  OnUpdateReservationUseCaseToken
} from '../tokens/tokens';

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
      // tap(() => {
      //   // TODO: wykonuje sie za duzo razy
      //   console.log('tap');
      // }),
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
