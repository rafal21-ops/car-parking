import { Route } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { ParkingSpotUseCase, ParkingSpotUseCasePort } from '../../libs/use-cases/parking-spot/parking-spot.use-case';
import {
  GetReservationUseCase,
  GetReservationUseCasePort
} from '../../libs/use-cases/reservation/get-reservation.use-case';
import { TestingComponent } from './testing/testing.component';
// import { InMemoryDataProvider } from '../../libs/infrastructure/in-memory/in-memory';
import { FirebaseDataProvider } from '../../libs/infrastructure/firebase/firebase-data-provider';

export const DbProviderToken = new InjectionToken<FirebaseDataProvider>(
  'DbProviderToken'
);
export const ParkingSpotUseCasePortToken = new InjectionToken<ParkingSpotUseCasePort>('ParkingSpotUseCasePortToken');
export const ReservationsUseCasePortToken = new InjectionToken<GetReservationUseCasePort>('ReservationsUseCasePortToken');


export const appRoutes: Route[] = [
  {
    path: '',
    component: TestingComponent,
    providers: [
      {
        provide: DbProviderToken,
        useFactory: () => {
          // return new InMemoryDataProvider();
          return new FirebaseDataProvider();
        },
      },
      {
        provide: ParkingSpotUseCasePortToken,
        useFactory: (db: any) => {
          return new ParkingSpotUseCase(db);
        },
        deps: [DbProviderToken],
      },
      {
        provide: ReservationsUseCasePortToken,
        useFactory: (db: any) => {
          return new GetReservationUseCase(db);
        },
        deps: [DbProviderToken],
      },
    ],
  },
];
