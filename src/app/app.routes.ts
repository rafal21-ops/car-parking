import { Route } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { TestingComponent } from './testing/testing.component';
import {
  InMemoryParkingSpotRepository,
  InMemoryReservationRepository,
} from '../../libs/infrastructure/in-memory/in-memory';
import { FirebaseParkingSpotRepository, FirebaseReservationRepository } from '../../libs/infrastructure/firebase/firebase-repositories';
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
import {
  GetReservationByParkingSpotIdAndDateUseCaseType, GetReservationsByParkingSpotIdAndDateUseCase
} from '../../libs/use-cases/reservation/get-reservations-by-parking-spot-id-and-date-use.case';

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
export const GetReservationByParkingSpotIdAndDateUseCaseToken = new InjectionToken<GetReservationByParkingSpotIdAndDateUseCaseType>('GetReservationByParkingSpotIdAndDateUseCaseToken');

const repositoryType: String = 'FIREBASE';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TestingComponent,
    providers: [
      // repositories
      {
        provide: ParkingSpotRepositoryToken,
        useFactory: () => {
          switch (repositoryType) {
            case 'IN_MEMORY':
            return new InMemoryParkingSpotRepository();
            case 'FIREBASE':
            return new FirebaseParkingSpotRepository();
            default:
            return new InMemoryParkingSpotRepository();
          }
        },
      },
      {
        provide: ReservationRepositoryToken,
        useFactory: () => {
          switch (repositoryType) {
            case 'IN_MEMORY':
            return new InMemoryReservationRepository();
            case 'FIREBASE':
            return new FirebaseReservationRepository();
            default:
            return new InMemoryReservationRepository();
          }
        },
      },

      // use-cases
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
      {
        provide: GetReservationByParkingSpotIdAndDateUseCaseToken,
        useFactory: (repository: ReservationRepository) => {
          return new GetReservationsByParkingSpotIdAndDateUseCase(repository);
        },
        deps: [ReservationRepositoryToken],
      },
    ],
  },
];
