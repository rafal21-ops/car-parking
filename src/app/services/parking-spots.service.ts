import { inject, Injectable } from '@angular/core';
import { ParkingSpot } from '../../../libs/domain/entities/parking-spot';
import { map, Observable, of } from 'rxjs';
import {
  GetAllParkingSpotsUseCaseToken,
} from '../app.routes';
import { Reservation } from '../../../libs/domain/entities/reservation';
import { ReservationsService } from './reservations.service';

@Injectable()
export class ParkingSpotService {
  parkingSpots: ParkingSpot[] = inject(
    GetAllParkingSpotsUseCaseToken
  ).execute();

  reservationService = inject(ReservationsService);

  getAll$(): Observable<ParkingSpot[]> {
    return of(this.parkingSpots);
  }

  isSpotFree$(
    parkingSpot: ParkingSpot,
    date: Date = new Date()
  ): Observable<boolean> {
    return this.reservationService
      .getReservationsByIdAndDate(parkingSpot.id, date)
      .pipe(map((reservations: Reservation[]) => reservations.length === 0));
  }
}
