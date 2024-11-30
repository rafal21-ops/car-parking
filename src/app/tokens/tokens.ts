import { InjectionToken } from '@angular/core';
import { EventBusType } from '../../../libs/domain/events/event-bus';
import { ParkingSpotRepository } from '../../../libs/domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../../libs/domain/repositories/reservation.repository';
import { GetAllParkingSpotsUseCaseType } from '../../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import { AddReservationUseCaseType } from '../../../libs/use-cases/reservation/add-reservation.use-case';
import {
  GetReservationByParkingSpotIdAndDateUseCaseType
} from '../../../libs/use-cases/reservation/get-reservations-by-parking-spot-id-and-date-use.case';
import { OnUpdateReservationUseCaseType } from '../../../libs/use-cases/reservation/on-update-reservation.use-case';
import { OnUpdateParkingSpotUseCaseType } from '../../../libs/use-cases/parking-spot/on-update-parking-spot.use-case';

export const EventBusToken = new InjectionToken<EventBusType>('EventBusToken');
export const ParkingSpotRepositoryToken =
  new InjectionToken<ParkingSpotRepository>('ParkingSpotRepositoryToken');
export const ReservationRepositoryToken =
  new InjectionToken<ReservationRepository>('ReservationRepositoryToken');

export const GetAllParkingSpotsUseCaseToken =
  new InjectionToken<GetAllParkingSpotsUseCaseType>(
    'GetAllParkingSpotsUseCaseToken'
  );
export const AddReservationUseCaseToken =
  new InjectionToken<AddReservationUseCaseType>('AddReservationUseCaseToken');
export const GetReservationByParkingSpotIdAndDateUseCaseToken =
  new InjectionToken<GetReservationByParkingSpotIdAndDateUseCaseType>(
    'GetReservationByParkingSpotIdAndDateUseCaseToken'
  );
export const OnUpdateReservationUseCaseToken =
  new InjectionToken<OnUpdateReservationUseCaseType>(
    'OnUpdateReservationUseCaseToken'
  );
export const OnUpdateParkingSpotUseCaseToken =
  new InjectionToken<OnUpdateParkingSpotUseCaseType>(
    'OnUpdateParkingSpotUseCaseToken'
  );