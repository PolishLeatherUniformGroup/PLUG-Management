import { Injectable, Type } from '@nestjs/common';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorableEvent } from '../../../eventstore/interfaces/storable-event.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { ApplyEvents } from '../../domain/events';

@Injectable()
export class ApplicantAggregateRepository implements AggregateRepository {
  constructor(
    @InjectRepository(StorableEvent)
    private readonly eventStore: Repository<StorableEvent>,
  ) {}

  async getById<T extends AggregateRoot>(
    type: Type<T>,
    aggregateId: string,
  ): Promise<T | null> {
    const storedEvents = await this.eventStore.find({
      where: { streamId: aggregateId },
      order: { timestamp: 'ASC' },
    });

    if (!storedEvents || storedEvents.length === 0) {
      return null;
    }

    const aggregateEvents = storedEvents.map((e) => {
      const event = JSON.parse(e.data);
      return ApplyEvents[e.eventType](...Object.values(event));
    });
    const aggregate = new type(aggregateId);

    aggregate.loadFromHistory(aggregateEvents);

    return aggregate;
  }
}
