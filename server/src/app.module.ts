import { Module } from '@nestjs/common';
import { ApplyModule } from './apply/apply.module';
import { EventStoreModule } from './core/eventstore/eventstore.module';


@Module({
  imports: [ApplyModule, EventStoreModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
