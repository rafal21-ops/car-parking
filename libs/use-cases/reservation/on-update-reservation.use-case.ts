import { EventBusType } from '../../domain/events/event-bus';
import { ReservationListUpdatedEvent } from '../../domain/events/ReservationListUpdatedEvent';

export interface OnUpdateReservationUseCaseType {
  execute(callback: () => void): void;
}

export class OnUpdateReservationUseCase implements OnUpdateReservationUseCaseType {
  constructor(
    private readonly eventBus: EventBusType
  ) {
  }

  execute(callback: () => void): void {
    this.eventBus.subscribe(ReservationListUpdatedEvent.name, callback);
  }
}