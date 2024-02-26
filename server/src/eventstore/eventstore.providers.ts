import { StoreEventBus } from './store-event-bus';
import { StoreEventPublisher } from './store-event-publisher';
import { ViewUpdater } from './view/view-updater';
import { ViewEventBus } from './view/view-event-bus';

export function createEventSourcingProviders() {
  return [
    ViewUpdater,
    ViewEventBus,
    StoreEventBus,
    StoreEventPublisher,
  ];
}
