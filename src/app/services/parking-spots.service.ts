import { inject, Injectable } from '@angular/core';
import { ParkingSpot } from '../../../libs/domain/entities/parking-spot';
import { BehaviorSubject, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { Reservation } from '../../../libs/domain/entities/reservation';
import { ReservationsService } from './reservations.service';
import { GetAllParkingSpotsUseCaseType } from '../../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import { GetAllParkingSpotsUseCaseToken, OnUpdateParkingSpotUseCaseToken } from '../tokens/tokens';

@Injectable()
export class ParkingSpotService {
  private readonly parkingSpotEvent = new BehaviorSubject(EMPTY);

  private readonly onUpdateParkingSpotEvent = inject(
    OnUpdateParkingSpotUseCaseToken
  );

  getAllParkingSpotsUseCase: GetAllParkingSpotsUseCaseType = inject(
    GetAllParkingSpotsUseCaseToken
  );

  reservationService = inject(ReservationsService);

  constructor() {
    this.onUpdateParkingSpotEvent.execute(() => {
      this.parkingSpotEvent.next(EMPTY);
    });
  }

  getAll$(): Observable<ParkingSpot[]> {
    return this.parkingSpotEvent.pipe(
      switchMap(() => {
        return of(this.getAllParkingSpotsUseCase.execute());
      })
    );
  }

  isSpotFree$(
    parkingSpot: ParkingSpot,
    date: Date = new Date()
  ): Observable<boolean> {
    // TODO: wywołuje się milion razy
    return this.reservationService
      .getReservationsByIdAndDate(parkingSpot.id, date)
      .pipe(map((reservations: Reservation[]) => reservations.length === 0));
  }
}
