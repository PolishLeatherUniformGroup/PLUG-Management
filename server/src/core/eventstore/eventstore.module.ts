import { DynamicModule } from '@nestjs/common';

import { EventStore } from './eventstore';

export class EventStoreModule {
  static forRoot(): DynamicModule {
    return {
      module: EventStoreModule,
      providers: [EventStore,],
      exports: [EventStore],
    };
  }
}