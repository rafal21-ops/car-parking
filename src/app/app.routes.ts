import { Route } from '@angular/router';
import { InjectionToken } from '@angular/core';
import {
  GetReservationUseCase,
  GetReservationUseCasePort,
} from '../../libs/use-cases/reservation/get-reservation.use-case';
import { TestingComponent } from './testing/testing.component';
import {
  InMemoryDataProvider,
  InMemoryParkingSpotRepository,
} from '../../libs/infrastructure/in-memory/in-memory';
import { FirebaseDataProvider } from '../../libs/infrastructure/firebase/firebase-data-provider';
import {
  GetAllParkingSpotsUseCase,
  GetAllParkingSpotsUseCaseType
} from '../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import { ParkingSpotRepository } from '../../libs/domain/repositories/parking-spot.repository';

export const DbProviderToken = new InjectionToken<FirebaseDataProvider>(
  'DbProviderToken'
);
export const ParkingSpotRepositoryToken = new InjectionToken<ParkingSpotRepository>(
  'ParkingSpotRepositoryToken'
);
export const ReservationsUseCasePortToken =
  new InjectionToken<GetReservationUseCasePort>('ReservationsUseCasePortToken');
export const GetAllParkingSpotsUseCasePortToken =
  new InjectionToken<GetAllParkingSpotsUseCaseType>(
    'GetAllParkingSpotsUseCasePortToken'
  );

export const appRoutes: Route[] = [
  {
    path: '',
    component: TestingComponent,
    providers: [
      {
        provide: ParkingSpotRepositoryToken,
        useFactory: () => {
          return new InMemoryParkingSpotRepository();
        },
      },
      {
        provide: GetAllParkingSpotsUseCasePortToken,
        useFactory: (repository: ParkingSpotRepository) => {
          return new GetAllParkingSpotsUseCase(repository);
        },
        deps: [ParkingSpotRepositoryToken],
      },

      {
        provide: DbProviderToken,
        useFactory: () => {
          return new InMemoryDataProvider();
          // return new FirebaseDataProvider();
        },
      },
      {
        provide: ReservationsUseCasePortToken,
        useFactory: (infra: any) => {
          return new GetReservationUseCase(infra);
        },
        deps: [DbProviderToken],
      },
    ],
  },
];
