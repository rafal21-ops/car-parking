import { EventBusType, EventCallback } from '../../domain/events/event-bus';

export class EventBus implements EventBusType {
  private eventCallbacks: Map<string, EventCallback[]> = new Map();

  publish(event: any): void {
    const eventName = event.constructor.name;
    const callbacks = this.eventCallbacks.get(eventName) || [];
    callbacks.forEach((callback) => {
      callback(event);
    });
  }

  subscribe(eventName: string, callback: EventCallback): void {
    const callbacks = this.eventCallbacks.get(eventName) || [];
    callbacks.push(callback);
    this.eventCallbacks.set(eventName, callbacks);
  }

  unsubscribe(eventName: string, callback: EventCallback): void {
    const callbacks = this.eventCallbacks.get(eventName) || [];
    this.eventCallbacks.set(
      eventName,
      callbacks.filter((cb) => cb !== callback)
    );
  }
}
