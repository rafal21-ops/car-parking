import { EventBusType } from '../../domain/events/event-bus';
import { ParkingSpotListUpdatedEvent } from '../../domain/events/ParkingSpotListUpdatedEvent';

export interface OnUpdateParkingSpotUseCaseType {
  execute(callback: () => void): void;
}

export class OnUpdateParkingSpotUseCase
  implements OnUpdateParkingSpotUseCaseType
{
  constructor(private readonly eventBus: EventBusType) {}

  execute(callback: () => void): void {
    this.eventBus.subscribe(ParkingSpotListUpdatedEvent.name, callback);
  }
}
