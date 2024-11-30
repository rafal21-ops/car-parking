import { environment } from '../environments/environment';
import { Route } from '@angular/router';
import { MainComponent } from './main/main.component';
import {
  InMemoryParkingSpotRepository,
  InMemoryReservationRepository,
} from '../../libs/infrastructure/in-memory/in-memory';
import {
  FirebaseParkingSpotRepository,
  FirebaseReservationRepository,
} from '../../libs/infrastructure/firebase/firebase-repositories';
import { GetAllParkingSpotsUseCase } from '../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import { ParkingSpotRepository } from '../../libs/domain/repositories/parking-spot.repository';
import { ReservationRepository } from '../../libs/domain/repositories/reservation.repository';
import { AddReservationUseCase } from '../../libs/use-cases/reservation/add-reservation.use-case';
import { GetReservationsByParkingSpotIdAndDateUseCase } from '../../libs/use-cases/reservation/get-reservations-by-parking-spot-id-and-date-use.case';
import { OnUpdateReservationUseCase } from '../../libs/use-cases/reservation/on-update-reservation.use-case';
import { EventBusType } from '../../libs/domain/events/event-bus';
import { EventBus } from '../../libs/infrastructure/event-bus/event-bus';
import { OnUpdateParkingSpotUseCase } from '../../libs/use-cases/parking-spot/on-update-parking-spot.use-case';
import {
  AddReservationUseCaseToken,
  EventBusToken,
  GetAllParkingSpotsUseCaseToken,
  GetReservationByParkingSpotIdAndDateUseCaseToken,
  OnUpdateParkingSpotUseCaseToken,
  OnUpdateReservationUseCaseToken,
  ParkingSpotRepositoryToken,
  ReservationRepositoryToken,
} from './tokens/tokens';

enum RepositoryType {
  FIREBASE = 'FIREBASE',
  IN_MEMORY = 'IN_MEMORY',
}

function getRepositoryType(): RepositoryType {
  let repostoryType: RepositoryType = RepositoryType.IN_MEMORY;
  
  switch(environment.repositoryType) {
    case 'in_memory':
      repostoryType = RepositoryType.IN_MEMORY;
      break;
    case 'firebase':
      repostoryType = RepositoryType.FIREBASE;
      break;
  }

  return repostoryType;
}

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
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
          switch (getRepositoryType()) {
            case RepositoryType.FIREBASE:
              return new FirebaseParkingSpotRepository(eventBus);
            case RepositoryType.IN_MEMORY:
            default:
              return new InMemoryParkingSpotRepository(eventBus);
          }
        },
        deps: [EventBusToken],
      },
      {
        provide: ReservationRepositoryToken,
        useFactory: (eventBus: EventBusType) => {
          switch (getRepositoryType()) {
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
