import { TestBed } from '@angular/core/testing';
import { TestingComponent } from './testing.component';
import { RouterModule } from '@angular/router';
import {
  AddReservationUseCaseToken,
  GetAllParkingSpotsUseCaseToken, GetReservationByParkingSpotIdAndDateUseCaseToken,
  ParkingSpotRepositoryToken,
  ReservationRepositoryToken
} from 'app/app.routes';
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
import {
  GetReservationsByParkingSpotIdAndDateUseCase
} from '../../../libs/use-cases/reservation/get-reservations-by-parking-spot-id-and-date-use.case';

describe('TestingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingComponent, RouterModule.forRoot([])],
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
    const fixture = TestBed.createComponent(TestingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-test-id="card-title"]')?.textContent
    ).toContain('Lista dostępnych miejsc');
  });
});
