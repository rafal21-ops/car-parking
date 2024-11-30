export type EventCallback = (...args: any[]) => void;

export interface EventBusType {
  publish(event: any): void;
  subscribe(eventName: string, callback: EventCallback): void;
  unsubscribe(eventName: string, callback: EventCallback): void;
}