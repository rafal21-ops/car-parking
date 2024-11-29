import { inject, Injectable } from '@angular/core';
import {
  AddReservationUseCaseToken,
  GetReservationByParkingSpotIdAndDateUseCaseToken,
} from '../app.routes';
import {
  BehaviorSubject,
  distinctUntilChanged,
  EMPTY,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  tap
} from 'rxjs';

@Injectable()
export class ReservationsService {
  private readonly reservationEvent = new BehaviorSubject(EMPTY);

  private readonly getReservationsUseCase = inject(
    GetReservationByParkingSpotIdAndDateUseCaseToken
  );

  private readonly addReservationUseCase = inject(AddReservationUseCaseToken);

  getReservationsByIdAndDate(
    parkingSpotId: string,
    date: Date = new Date()
  ): Observable<any> {
    return this.reservationEvent.pipe(
      shareReplay(),
      // tap(() => console.log('event')),
      switchMap(() => {
        return of(this.getReservationsUseCase.execute(parkingSpotId, date));
      })
    )
  }

  addReservation(parkingSpotId: string, reservationOwner: string, date: Date): void {
    this.addReservationUseCase.execute(parkingSpotId, reservationOwner, date);
    this.reservationEvent.next(EMPTY);
  }
}
