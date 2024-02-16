import { Module } from '@nestjs/common';

import { EventStore } from './eventstore';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  exports: [TypeOrmModule, EventStore],
  providers: [EventStore],
})
export class EventStoreModule {}
