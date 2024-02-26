import { Injectable, Logger } from '@nestjs/common';
import { StoreEventBus } from './store-event-bus';
import { IEvent, AggregateRoot } from '@nestjs/cqrs';

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class StoreEventPublisher {
  private readonly logger = new Logger(StoreEventPublisher.name);
  constructor(private readonly eventBus: StoreEventBus) {
    console.log('StoreEventPublisher created');
  }

  mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T {
    const eventBus = this.eventBus;
    return class extends metatype {
      publish(event: IEvent) {
        eventBus.publish(event);
      }
    };
  }

  mergeObjectContext<T extends AggregateRoot>(object: T | null): T | null {
    console.log('Merging object context');
    if (object === null) {
      console.log('Object is null');
      return null;
    }
  
    const eventBus = this.eventBus;
    object.commit = () => {
      object.publishAll(object.getUncommittedEvents());
    };
    object.publishAll = (events: IEvent[]) => {
      events.forEach((event) => {
        this.logger.log(`Publishing event: ${event.constructor.name}`);
        object.publish(event);
      });
    }
    object.publish = (event: IEvent) => {
      this.logger.log(`Publishing event: ${event.constructor.name}`);
      eventBus.publish(event);
    };
    return object;
  }
}
