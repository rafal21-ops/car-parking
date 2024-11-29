import { inject, Injectable } from '@angular/core';
import { ParkingSpot } from '../../../libs/domain/entities/parking-spot';
import { map, Observable } from 'rxjs';
import {
  GetAllParkingSpotsUseCaseToken,
} from '../app.routes';
import { Reservation } from '../../../libs/domain/entities/reservation';
import { ReservationsService } from './reservations.service';
import { GetAllParkingSpotsUseCaseType } from '../../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';

@Injectable()
export class ParkingSpotService {
  getAllParkingSpotsUseCase: GetAllParkingSpotsUseCaseType = inject(
    GetAllParkingSpotsUseCaseToken
  );

  reservationService = inject(ReservationsService);

  getAll$(): Observable<ParkingSpot[]> {
    return this.getAllParkingSpotsUseCase.execute$();
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
