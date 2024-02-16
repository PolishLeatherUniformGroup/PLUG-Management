import { IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import { Subject } from 'rxjs';
import { AggregateRoot } from '../domain';
import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventStore implements IEventPublisher, IMessageSource {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    console.log('bridgeEventsTo', subject.asObservable());
  }

  private _eventHandlers: [];

  publish<TEvent extends IEvent>(event: TEvent, context?: unknown) {
    console.log('publishing event', context, event);
    if ('id' in event === false) {
      throw new Error('Not a DomainEvent');
    }
    const message = JSON.stringify(event);
    const id = event.id;
    const streamName = `${id}`;
    const type = event.constructor.name;

    try {
      const entity = this.eventRepository.create();
      entity.data = message;
      entity.streamId = streamName;
      entity.eventType = type;
      entity.timestamp = new Date();
      this.eventRepository.save(entity);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.trace(err);
    }
  }

  publishAll?<TEvent extends IEvent>(events: TEvent[], context?: unknown) {
    events.forEach((event) => this.publish(event, context));
  }

  async read<T extends AggregateRoot>(
    aggregate: Function,
    id: string,
  ): Promise<T | null> {
    const streamName = `${id}`;
    console.log('reading stream', streamName);
    try {
      const entity = Reflect.construct(aggregate, []);
      console.log('entity', entity);
      // read stream
      const eventStream: Event[] = await this.eventRepository.find({
        where: { streamId: streamName },
        order: { timestamp: 'ASC' },
      });

      const events = eventStream.map((event) => {
        const eventType = event.eventType;
        const data = JSON.parse(event.data);
        console.log('eventHandlers', this._eventHandlers);
        return this._eventHandlers[eventType](...Object.values(data));
      });

      if (events.length === 0) {
        return null;
      }

      entity.loadFromHistory(events);
      return entity;
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.trace(err);
    }

    return null;
  }

  addEventHandlers(eventHandlers: object) {
    this._eventHandlers = {
      ...this._eventHandlers,
      ...eventHandlers,
    };
  }
}
