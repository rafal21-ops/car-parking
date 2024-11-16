import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ParkingSpotUseCase } from '../../libs/use-cases/parking-spot/parking-spot.use-case';
import { ParkingSpotEntity } from '../../libs/domain/entities/parking-spot.entity';
import { InMemoryDataProvider } from '../../libs/infrastructure/in-memory/in-memory';
import { FirebaseDataProvider } from '../../libs/infrastructure/firebase/firebase-data-provider';
import { AsyncPipe, NgForOf } from '@angular/common';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { LocalStorageService } from './services/localStorage.service';

export interface UserInformation {
  userName: string;
  email: string;
}
import { GetReservationUseCase } from '../../libs/use-cases/reservation/get-reservation.use-case';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzContentComponent,
    NzFooterComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzAvatarComponent,
    NzButtonComponent,
    NzIconDirective,
    NzIconModule,
    NzTableComponent,
    NgForOf,
    AsyncPipe
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Parking APP';
  dataSet: ParkingSpotEntity[] = [];
  reservations: GetReservationUseCase;
  userInformation: UserInformation | null | undefined;


  constructor() {
    const db = new InMemoryDataProvider();
    // const db = new FirebaseDataProvider();

    const parkingSpots = new ParkingSpotUseCase(db);
    parkingSpots.getAll().then(parkingSpots => {
      this.dataSet = parkingSpots;
      parkingSpots.forEach(parkingSpot => {
        console.log(this.reservations.isParkingSpotFree(parkingSpot.id).then(console.log));
      });
    });

    this.reservations = new GetReservationUseCase(db);
  }

  isParkingSpotFree(parkingSpot: ParkingSpotEntity): boolean {
    console.log('isParkingSpotFree');
    return false;
  }

  onReservation(id: string): void {
    console.log('click', id)
  }
}

