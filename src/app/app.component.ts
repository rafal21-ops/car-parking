import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {ParkingSpotUseCase} from '../../libs/use-cases/parking-spot/parking-spot.use-case';
import { ParkingSpotEntity } from '../../libs/domain/entities/parking-spot.entity';
import { InMemoryClass } from '../../libs/infrastructure/in-memory/in-memory';
import { JsonPipe } from '@angular/common';

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
    JsonPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'syzygy';
  spots: ParkingSpotEntity[] = [];

  constructor() {
    const db = new InMemoryClass();
    const parkingSpots = new ParkingSpotUseCase();
    parkingSpots.init(db);

    this.spots = parkingSpots.getAll();
  }
}
