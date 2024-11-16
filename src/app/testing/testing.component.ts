import { ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingSpotEntity } from '../../../libs/domain/entities/parking-spot.entity';
import { GetReservationUseCase } from '../../../libs/use-cases/reservation/get-reservation.use-case';
import { InMemoryDataProvider } from '../../../libs/infrastructure/in-memory/in-memory';
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


@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule, NzCalendarModule, NzTableComponent,
    NzCalendarComponent, NzButtonComponent, NzModalComponent, NzModalContentDirective,
    NzButtonModule, NzModalModule, NzSelectComponent, NzOptionComponent, NzInputDirective, FormsModule, NzDividerModule, NzTableModule, NzRowDirective, NzColDirective, NzGridModule, NzCardComponent, NzImageDirective, NzTagComponent],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.scss'
})
export class TestingComponent {
  title = 'Parking APP';
  dataSet: ParkingSpotEntity[] = [];
  reservations: GetReservationUseCase;
  parkingSpotsProvider!: ParkingSpotUseCase;
  #modalService = inject(NzModalService);
  modal = inject(NzModalService);
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  value?: string;

  date!: Date;

  isVisible = false;

  constructor() {
    const db = new InMemoryDataProvider();
    // const db = new FirebaseDataProvider();
    this.parkingSpotsProvider = new ParkingSpotUseCase(db);
    this.dataSet = this.parkingSpotsProvider.getAll();
    this.reservations = new GetReservationUseCase(db);
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

  makeReservation(id: string) {
    this.reservations.addReservation(
      id, 'Adam Kowalski', new Date()
    );

    this.dataSet = this.parkingSpotsProvider.getAll();
    console.log(this.reservations.getAll());
    console.log(this.dataSet);
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
