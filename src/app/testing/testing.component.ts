import { ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingSpotEntity } from '../../../libs/domain/entities/parking-spot.entity';
import { GetReservationUseCase } from '../../../libs/use-cases/reservation/get-reservation.use-case';
import { InMemoryDataProvider } from '../../../libs/infrastructure/in-memory/in-memory';
import { FirebaseDataProvider } from '../../../libs/infrastructure/firebase/firebase-data-provider';
import { ParkingSpotUseCase } from '../../../libs/use-cases/parking-spot/parking-spot.use-case';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzCalendarModule, NzCalendarComponent } from 'ng-zorro-antd/calendar';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalModule,
  NzModalRef,
  NzModalService
} from 'ng-zorro-antd/modal';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzColDirective, NzGridModule, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzImageDirective } from 'ng-zorro-antd/image';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { OnDestroy } from '@angular/core';


@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule, NzCalendarModule, NzTableComponent,
    NzCalendarComponent, NzButtonComponent, NzModalComponent, NzModalContentDirective,
    NzButtonModule, NzModalModule, NzSelectComponent, NzOptionComponent, NzInputDirective, FormsModule, NzDividerModule, NzTableModule, NzRowDirective, NzColDirective, NzGridModule, NzCardComponent, NzImageDirective, NzTagComponent],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.scss'
})
export class TestingComponent implements OnDestroy {
  title = 'Parking APP';
  parkingSpots: ParkingSpotEntity[] = [];
  reservations: GetReservationUseCase;
  parkingSpotsProvider!: ParkingSpotUseCase;
  #modalService = inject(NzModalService);
  modal = inject(NzModalService);
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  value?: string;

  date!: Date;

  isVisible = false;

  isPlatformBrowser: boolean;
  intervalId: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isPlatformBrowser = isPlatformBrowser(platformId);

    const db = new FirebaseDataProvider();
    this.parkingSpotsProvider = new ParkingSpotUseCase(db);
    this.reservations = new GetReservationUseCase(db);
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

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  isParkingSpotFree(parkingSpot: ParkingSpotEntity): boolean {
    return this.reservations.isParkingSpotFree(parkingSpot.id, this.date);
  }

  getReservationOwner(parkingSpot: ParkingSpotEntity): string {
    return this.reservations.getReservationOwner(parkingSpot.id);
  }

  makeReservation(id: string) {
    this.reservations.addReservation(
      id, 'Adam Kowalski', new Date()
    );

    this.parkingSpots = this.parkingSpotsProvider.getAll();
    console.log(this.reservations.getAll());
    console.log(this.parkingSpots);
  }

  onReservation(id: string): void {
    const modal: NzModalRef = this.#modalService.create({
      nzTitle: 'Potwierdzenie rezerwacji',
      nzContent: this.modalContent,
      nzWidth: '860px',
      nzFooter: [
        {
          label: 'Close',
          onClick: () => modal.destroy()
        },
        {
          label: 'Confirm',
          type: 'primary',
          onClick: () => {
            this.makeReservation(id);
            modal.close();
          }
        }
      ]
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
