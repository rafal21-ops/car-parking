import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingSpotEntity } from '../../../libs/domain/entities/parking-spot.entity';
import { GetReservationUseCase } from '../../../libs/use-cases/reservation/get-reservation.use-case';
import { InMemoryDataProvider } from '../../../libs/infrastructure/in-memory/in-memory';
import { ParkingSpotUseCase } from '../../../libs/use-cases/parking-spot/parking-spot.use-case';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import {  NzCalendarModule, NzCalendarComponent } from 'ng-zorro-antd/calendar';
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


@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule,NzTableModule, NzCalendarModule, NzTableComponent,
    NzCalendarComponent, NzButtonComponent, NzModalComponent, NzModalContentDirective,
    NzButtonModule, NzModalModule, NzSelectComponent, NzOptionComponent, NzInputDirective, FormsModule],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.scss',
})
export class TestingComponent {
  title = 'syzygy';
  dataSet: ParkingSpotEntity[] = [];
  reservations: GetReservationUseCase;

  parkingSpotsProvider!: ParkingSpotUseCase;

  #modalService = inject(NzModalService);
  modal = inject(NzModalService)

  value?: string;

  date!: Date;

  isVisible = false;

  constructor() {
    const db = new InMemoryDataProvider();
    // const db = new FirebaseDataProvider();
    this.parkingSpotsProvider = new ParkingSpotUseCase(db)
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
    )

    this.dataSet = this.parkingSpotsProvider.getAll();
    console.log(this.reservations.getAll());
    console.log(this.dataSet);
  }

  onReservation(id: string): void {
    const modal: NzModalRef = this.#modalService.create({
      nzTitle: 'custom button demo',
      nzContent: 'pass array of button config to nzFooter to create multiple buttons',
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy()
        },
        {
          label: 'Confirm',
          type: 'primary',
          onClick: () => {
           this.makeReservation(id)
            modal.close();
          }
        },
      ]
    })
  }

  onValueChange(value: Date): void {
    this.date = value;
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }
}
