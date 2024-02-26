import { Type } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export interface AggregateRepository {

  
  getById<T extends AggregateRoot>(
    type: Type<T>,
    aggregateId: string,
  ): Promise<T | null>
    
}
