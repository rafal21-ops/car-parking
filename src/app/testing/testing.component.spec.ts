import { TestBed } from '@angular/core/testing';
import { TestingComponent } from './testing.component';
import { RouterModule } from '@angular/router';
import {
  AddReservationUseCaseToken,
  DbProviderToken,
  GetAllParkingSpotsUseCaseToken,
  ParkingSpotRepositoryToken, ReservationRepositoryToken,
  ReservationsUseCasePortToken
} from 'app/app.routes';
import { GetReservationUseCase } from '../../../libs/use-cases/reservation/get-reservation.use-case';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { ParkingSpotRepository } from '../../../libs/domain/repositories/parking-spot.repository';
import { GetAllParkingSpotsUseCase } from '../../../libs/use-cases/parking-spot/get-all-parking-spots.use-case';
import {
  InMemoryDataProvider,
  InMemoryParkingSpotRepository,
  InMemoryReservationRepository
} from '../../../libs/infrastructure/in-memory/in-memory';
import { ReservationRepository } from '../../../libs/domain/repositories/reservation.repository';
import { AddReservationUseCase } from '../../../libs/use-cases/reservation/add-reservation.use-case';

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
          provide: DbProviderToken,
          useFactory: () => {
            return new InMemoryDataProvider();
            // return new FirebaseDataProvider();
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
        {
          provide: ReservationsUseCasePortToken,
          useFactory: (db: any) => {
            return new GetReservationUseCase(db);
          },
          deps: [DbProviderToken],
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
