import { TestBed } from '@angular/core/testing';
import { TestingComponent } from './testing.component';
import { RouterModule } from '@angular/router';
import { DbProviderToken, ParkingSpotUseCasePortToken, ReservationsUseCasePortToken } from 'app/app.routes';
import { InMemoryDataProvider } from '../../../libs/infrastructure/in-memory/in-memory';
import { ParkingSpotUseCase } from '../../../libs/use-cases/parking-spot/parking-spot.use-case';
import { GetReservationUseCase } from '../../../libs/use-cases/reservation/get-reservation.use-case';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

describe('TestingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: DbProviderToken,
          useFactory: () => {
            return new InMemoryDataProvider();
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
        provideNzI18n(en_US),
      ],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TestingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-test-id="card-title"]')?.textContent).toContain(
      'Lista dostępnych miejsc'
    );
  });
});