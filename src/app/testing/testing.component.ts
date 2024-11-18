import {
  Component,
  inject,
  Inject,
  OnDestroy, OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ParkingSpotEntity } from '../../../libs/domain/entities/parking-spot.entity';
import {
  GetReservationUseCasePort
} from '../../../libs/use-cases/reservation/get-reservation.use-case';
import {
  ParkingSpotUseCasePort,
} from '../../../libs/use-cases/parking-spot/parking-spot.use-case';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {
  NzColDirective,
  NzGridModule,
  NzRowDirective,
} from 'ng-zorro-antd/grid';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { ParkingSpotUseCasePortToken, ReservationsUseCasePortToken } from '../app.routes';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [
    CommonModule,
    NzCalendarModule,
    NzTableComponent,
    NzButtonComponent,
    NzButtonModule,
    NzModalModule,
    NzInputDirective,
    FormsModule,
    NzDividerModule,
    NzTableModule,
    NzRowDirective,
    NzColDirective,
    NzGridModule,
    NzCardComponent,
    NzTagComponent,
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.scss',
})
export class TestingComponent implements OnDestroy, OnInit {
  parkingSpots: ParkingSpotEntity[] = [];
  #modalService = inject(NzModalService);
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  value?: string;

  date!: Date;

  isPlatformBrowser: boolean;
  intervalId: any;
  reservationOwner: any;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(ParkingSpotUseCasePortToken) private readonly parkingSpotsProvider : ParkingSpotUseCasePort,
    @Inject(ReservationsUseCasePortToken) private readonly reservations : GetReservationUseCasePort,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // hack the hell out of it, we can't use setInterval in SSR
    if (this.isPlatformBrowser) {
      // this is all shit, but enables us to use simple array based, non-async domain model
      // this should be eventually changed tho :P
      this.intervalId = setInterval(() => {
        this.parkingSpots = this.parkingSpotsProvider.getAll();
      }, 100); // and this code is slow of course because it adds <=100ms delay
    }
    // but works :P
  }

  ngOnDestroy() {
    if (this.isPlatformBrowser) {
      clearInterval(this.intervalId);
    }
  }

  isParkingSpotFree(parkingSpot: ParkingSpotEntity): boolean {
    return this.reservations.isParkingSpotFree(parkingSpot.id, this.date);
  }

  getReservationOwner(parkingSpot: ParkingSpotEntity): string {
    return this.reservations.getLastReservationOwner(parkingSpot.id, new Date());
  }

  getReservationDate(parkingSpot: ParkingSpotEntity): string {
    return this.reservations
      .getLastReservationDate(parkingSpot.id, new Date())
      .toLocaleDateString();
  }

  saveReservation(parkingSpotId: string) {
    this.reservations.addReservation(
      parkingSpotId,
      this.reservationOwner,
      new Date()
    );
  }

  createReservationModal(parkingSpotId: string): void {
    const modal: NzModalRef = this.#modalService.create({
      nzTitle: 'Tworzenie rezerwacji',
      nzContent: this.modalContent,
      nzWidth: '860px',
      nzFooter: [
        {
          label: 'Anuluj',
          onClick: () => modal.destroy(),
        },
        {
          label: 'Zapisz',
          type: 'primary',
          onClick: () => {
            this.saveReservation(parkingSpotId);
            modal.close();
          },
        },
      ],
    });
  }

  onValueChange(value: Date): void {
    this.date = value;
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  disablePastDates = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current < today;
  };

  currentDate: Date = new Date();

  changeMonth(offset: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(this.currentDate.getMonth() + offset);
    this.currentDate = newDate;
  }  
}
