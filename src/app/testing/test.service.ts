import { Injectable } from '@angular/core';
import { GetReservationUseCase } from '../../../libs/use-cases/reservation/get-reservation.use-case';
import { InMemoryDataProvider } from '../../../libs/infrastructure/in-memory/in-memory';


@Injectable()
export class TestService {

  reservations: GetReservationUseCase;

  constructor() {
    const db = new InMemoryDataProvider();
    this.reservations = new GetReservationUseCase(db);
  }


  prepareData() {

  }



}