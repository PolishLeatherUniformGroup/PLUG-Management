import { Global, Module, OnModuleInit } from '@nestjs/common';
import { MemberView } from './infrastructure/read-model/model/member.entity';
import { MembershipFeeView } from './infrastructure/read-model/model/membership-fee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from 'src/core/eventstore/eventstore.module';
import { CommandHandlers } from './application/handler';
import { EventStore } from 'src/core/eventstore/eventstore';
import { MembersEvents } from './domain/events';
import { Projections } from './infrastructure/read-model/projection';
import { Notifications as NotificationHandlers } from './infrastructure/notifications';
import { MembersProviders } from './infrastructure/members.providers';
import { CommandController } from './infrastructure/controller/command.controller';
import { MemberCardNumber } from './infrastructure/read-model/model/member-card.entity';
import { MemberSuspensionView } from './infrastructure/read-model/model/member-suspension.entity';
import { MemberExpulsionView } from './infrastructure/read-model/model/member-expulsion.entity';
import { QueryController } from './infrastructure/controller/query.controller';
import { ApplyModule } from 'src/apply/apply.module';
import { QueryHandlers } from './infrastructure/query/handler';

@Global()
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      MemberView,
      MembershipFeeView,
      MemberCardNumber,
      MemberSuspensionView,
      MemberExpulsionView,
    ]),
    EventStoreModule
  ],
  controllers: [CommandController, QueryController],
  providers: [
    ...CommandHandlers,
    ...Projections,
    ...NotificationHandlers,
    ...MembersProviders,
    ...QueryHandlers
  ],
  exports: [
    ...QueryHandlers,
  ],
})
export class MembersModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}
  onModuleInit() {
    this.eventStore.addEventHandlers(MembersEvents);
  }
}
