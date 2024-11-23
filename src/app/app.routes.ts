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
  InMemoryReservationRepository,
} from '../../libs/infrastructure/in-memory/in-memory';
import { FirebaseDataProvider } from '../../libs/infrastructure/firebase/firebase-data-provider';
import {
  GetAllParkingSpotsUseCase,
  GetAllParkingSpotsUseCaseType,
} from '../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import { ParkingSpotRepository } from '../../libs/domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../libs/domain/repositories/reservation.repository';
import {
  AddReservationUseCase,
  AddReservationUseCaseType
} from '../../libs/use-cases/reservation/add-reservation.use-case';

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

// old
export const DbProviderToken = new InjectionToken<FirebaseDataProvider>(
  'DbProviderToken'
);
export const ReservationsUseCasePortToken =
  new InjectionToken<GetReservationUseCasePort>('ReservationsUseCasePortToken');

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
        provide: ReservationRepositoryToken,
        useFactory: () => {
          return new InMemoryReservationRepository();
        },
      },

      {
        provide: GetAllParkingSpotsUseCaseToken,
        useFactory: (repository: ParkingSpotRepository) => {
          return new GetAllParkingSpotsUseCase(repository);
        },
        deps: [ParkingSpotRepositoryToken],
      },
      {
        provide: AddReservationUseCaseToken,
        useFactory: (repository: ReservationRepository) => {
          return new AddReservationUseCase(repository);
        },
        deps: [ReservationRepositoryToken],
      },

      // old
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
