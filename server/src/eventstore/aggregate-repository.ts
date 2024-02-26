import { Repository } from 'typeorm';
import { StorableEvent } from './interfaces/storable-event';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Type } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

@Injectable()
export class AggregateRepository {
  constructor(
    @InjectRepository(StorableEvent)
    private readonly eventStore: Repository<StorableEvent>,
  ) {}

  async getById<T extends AggregateRoot>(
    type: Type<T>,
    aggregateId: string,
  ): Promise<T | null> {
    const aggregateEvents = await this.eventStore.find({
      where: { streamId: aggregateId },
      order: { timestamp: 'ASC' },
    });

    if (!aggregateEvents || aggregateEvents.length === 0) {
      return null;
    }

    const aggregate = new type(aggregateId);

    aggregate.loadFromHistory(aggregateEvents);

    return aggregate;
  }
}
