import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ParkingSpot } from '../../../libs/domain/entities/parking-spot';
import { Reservation } from '../../../libs/domain/entities/reservation';
import { ParkingSpotService } from '../services/parking-spots.service';
import { ReservationsService } from '../services/reservations.service';
import { Observable } from 'rxjs';

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
  providers: [ParkingSpotService, ReservationsService],
})
export class TestingComponent {
  private readonly parkingSpotService = inject(ParkingSpotService);
  private readonly reservationsService = inject(ReservationsService);

  parkingSpots$: Observable<ParkingSpot[]> = this.parkingSpotService.getAll$();
  date: Date = new Date();
  reservationOwner = '';

  #modalService = inject(NzModalService);
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<null>;

  getReservations$(parkingSpot: ParkingSpot): Observable<Reservation[]> {
    return this.reservationsService.getReservationsByIdAndDate(
      parkingSpot.id,
      this.date
    );
  }

  isParkingSpotFree$(parkingSpot: ParkingSpot): Observable<boolean> {
    return this.parkingSpotService.isSpotFree$(parkingSpot, this.date);
  }

  saveReservation(parkingSpotId: string) {
    this.reservationsService.addReservation(
      parkingSpotId,
      this.reservationOwner,
      this.date
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

  onDateChange(value: Date): void {
    this.date = value;
  }

  disablePastDates = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current < today;
  };

  changeMonth(offset: number): void {
    const newDate = new Date(this.date);
    newDate.setMonth(this.date.getMonth() + offset);
    this.date = newDate;
  }
}
