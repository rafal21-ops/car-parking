import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingSpotEntity } from '../../../libs/domain/entities/parking-spot.entity';
import { GetReservationUseCase } from '../../../libs/use-cases/reservation/get-reservation.use-case';
import { InMemoryDataProvider } from '../../../libs/infrastructure/in-memory/in-memory';
import { ParkingSpotUseCase } from '../../../libs/use-cases/parking-spot/parking-spot.use-case';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [CommonModule, NzTableComponent],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.scss',
})
export class TestingComponent {
  title = 'syzygy';
  dataSet: ParkingSpotEntity[] = [];
  reservations: GetReservationUseCase;


  constructor() {
    const db = new InMemoryDataProvider();
    // const db = new FirebaseDataProvider();

    const parkingSpots = new ParkingSpotUseCase(db);
    parkingSpots.getAll().then(data => {
      this.dataSet = data;
    });

    this.reservations = new GetReservationUseCase(db);
  }


  async isParkingSpotFree(parkingSpot: ParkingSpotEntity): Promise<boolean> {
    return this.reservations.isParkingSpotFree(parkingSpot.id);
  }

  onReservation(id: string): void {
    console.log('click', id)
  }
}
