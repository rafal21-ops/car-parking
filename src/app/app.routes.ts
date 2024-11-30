import { Route } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { TestingComponent } from './testing/testing.component';
import {
  InMemoryParkingSpotRepository,
  InMemoryReservationRepository,
} from '../../libs/infrastructure/in-memory/in-memory';
import {
  FirebaseParkingSpotRepository,
  FirebaseReservationRepository,
} from '../../libs/infrastructure/firebase/firebase-repositories';
import {
  GetAllParkingSpotsUseCase,
  GetAllParkingSpotsUseCaseType,
} from '../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import { ParkingSpotRepository } from '../../libs/domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../libs/domain/repositories/reservation.repository';
import {
  AddReservationUseCase,
  AddReservationUseCaseType,
} from '../../libs/use-cases/reservation/add-reservation.use-case';
import {
  GetReservationByParkingSpotIdAndDateUseCaseType,
  GetReservationsByParkingSpotIdAndDateUseCase,
} from '../../libs/use-cases/reservation/get-reservations-by-parking-spot-id-and-date-use.case';
import {
  OnUpdateReservationUseCase,
  OnUpdateReservationUseCaseType,
} from '../../libs/use-cases/reservation/on-update-reservation.use-case';
import { EventBusType } from '../../libs/domain/events/event-bus';
import { EventBus } from '../../libs/infrastructure/event-bus/event-bus';
import {
  OnUpdateParkingSpotUseCase,
  OnUpdateParkingSpotUseCaseType
} from '../../libs/use-cases/parking-spot/on-update-parking-spot.use-case';

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

const repositoryType: string = 'FIREBASE';

export const appRoutes: Route[] = [
  {
    path: '',
    component: TestingComponent,
    providers: [
      // repositories
      {
        provide: EventBusToken,
        useFactory: () => {
          return new EventBus();
        },
      },
      {
        provide: ParkingSpotRepositoryToken,
        useFactory: (eventBus: EventBusType) => {
          switch (repositoryType) {
            case 'FIREBASE':
              return new FirebaseParkingSpotRepository(eventBus);
            case 'IN_MEMORY':
            default:
              return new InMemoryParkingSpotRepository(eventBus);
          }
        },
        deps: [EventBusToken],
      },
      {
        provide: ReservationRepositoryToken,
        useFactory: (eventBus: EventBusType) => {
          switch (repositoryType) {
            case 'FIREBASE':
              return new FirebaseReservationRepository(eventBus);
            case 'IN_MEMORY':
            default:
              return new InMemoryReservationRepository(eventBus);
          }
        },
        deps: [EventBusToken],
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
      {
        provide: OnUpdateReservationUseCaseToken,
        useFactory: (eventBus: EventBusType) => {
          return new OnUpdateReservationUseCase(eventBus);
        },
        deps: [EventBusToken],
      },
      {
        provide: OnUpdateParkingSpotUseCaseToken,
        useFactory: (eventBus: EventBusType) => {
          return new OnUpdateParkingSpotUseCase(eventBus);
        },
        deps: [EventBusToken],
      },
    ],
  },
];
