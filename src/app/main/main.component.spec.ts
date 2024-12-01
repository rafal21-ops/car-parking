import { TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { ParkingSpotRepository } from '../../../libs/domain/repositories/parking-spot.repository';
import { GetAllParkingSpotsUseCase } from '../../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import {
  InMemoryParkingSpotRepository,
  InMemoryReservationRepository,
} from '../../../libs/infrastructure/in-memory/in-memory';
import { ReservationRepository } from '../../../libs/domain/repositories/reservation.repository';
import { AddReservationUseCase } from '../../../libs/use-cases/reservation/add-reservation.use-case';
import { ReservationsService } from '../services/reservations.service';
import { ParkingSpotService } from '../services/parking-spots.service';
import { GetReservationsByParkingSpotIdAndDateUseCase } from '../../../libs/use-cases/reservation/get-reservations-by-parking-spot-id-and-date-use.case';
import { OnUpdateReservationUseCase } from '../../../libs/use-cases/reservation/on-update-reservation.use-case';
import { EventBus } from '../../../libs/infrastructure/event-bus/event-bus';
import { EventBusType } from '../../../libs/domain/events/event-bus';
import { OnUpdateParkingSpotUseCase } from '../../../libs/use-cases/parking-spot/on-update-parking-spot.use-case';
import {
  AddReservationUseCaseToken,
  EventBusToken,
  GetAllParkingSpotsUseCaseToken,
  GetReservationByParkingSpotIdAndDateUseCaseToken,
  OnUpdateParkingSpotUseCaseToken,
  OnUpdateReservationUseCaseToken,
  ParkingSpotRepositoryToken,
  ReservationRepositoryToken
} from '../tokens/tokens';

describe('TestingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: EventBusToken,
          useFactory: () => {
            return new EventBus();
          },
        },
        {
          provide: ParkingSpotRepositoryToken,
          useFactory: (eventBus: EventBusType) => {
            return new InMemoryParkingSpotRepository(eventBus);
          },
          deps: [EventBusToken],
        },
        {
          provide: ReservationRepositoryToken,
          useFactory: (eventBus: EventBusType) => {
            return new InMemoryReservationRepository(eventBus);
          },
          deps: [EventBusToken],
        },

        {
          provide: GetAllParkingSpotsUseCaseToken,
          useFactory: (repository: ParkingSpotRepository) => {
            return new GetAllParkingSpotsUseCase(repository);
          },
          deps: [ParkingSpotRepositoryToken],
        },
        {
          provide: GetReservationByParkingSpotIdAndDateUseCaseToken,
          useFactory: (repository: ReservationRepository) => {
            return new GetReservationsByParkingSpotIdAndDateUseCase(repository);
          },
          deps: [ReservationRepositoryToken],
        },
        {
          provide: AddReservationUseCaseToken,
          useFactory: (repository: ReservationRepository) => {
            return new AddReservationUseCase(repository);
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

        {
          provide: ReservationsService,
        },
        {
          provide: ParkingSpotService,
        },
        provideNzI18n(en_US),
      ],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test-id="main-list-title"]')?.textContent
    ).toContain('Lista miejsc');
  });
});
