import { Injectable } from '@nestjs/common';
import { IEvent, IEventBus } from '@nestjs/cqrs/dist/interfaces';
import { StorableEvent } from './interfaces/storable-event';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ViewEventBus } from './view/view-event-bus';

@Injectable()
export class StoreEventBus implements IEventBus {
  constructor(
    private readonly eventBus: ViewEventBus,
    @InjectRepository(StorableEvent)
    private readonly eventStore: Repository<StorableEvent>,
  ) {}

  publish<T extends IEvent>(event: T): void {
    if ('id' in event === false) {
      throw new Error('Not a DomainEvent');
    }
    const message = JSON.stringify(event);
    const id = event.id;
    const streamName = `${id}`;
    const type = event.constructor.name;
    const entity = this.eventStore.create();
    entity.data = message;
    entity.streamId = streamName;
    entity.eventType = type;
    entity.timestamp = new Date();
    this.eventStore
      .save(entity)
      .then(() => this.eventBus.publish(event))
      .catch((err) => {
        throw err;
      });
  }

  publishAll(events: IEvent[]): void {
    (events || []).forEach((event) => this.publish(event));
  }
}
