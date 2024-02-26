import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createEventSourcingProviders } from './eventstore.providers';
import { CqrsModule } from '@nestjs/cqrs';
import { StorableEvent } from './interfaces/storable-event';

@Module({})
export class EventStoreModule {
  static forRoot(): DynamicModule {
    return {
      module: EventStoreModule,
      imports: [TypeOrmModule.forFeature([StorableEvent]), CqrsModule],
      providers: [],
      exports: [TypeOrmModule],
      global: true,
    };
  }
  static forFeature(): DynamicModule {
    const providers = createEventSourcingProviders();
    return {
      module: EventStoreModule,
      imports: [CqrsModule],
      providers: providers,
      exports: providers,
    };
  }
}
