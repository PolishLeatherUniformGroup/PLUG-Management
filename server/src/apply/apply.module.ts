import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from 'src/core/eventstore/eventstore.module';

@Module({
    imports: [CqrsModule, EventStoreModule.forRoot()],
})
export class ApplyModule {}
