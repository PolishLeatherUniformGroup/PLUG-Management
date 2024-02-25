import { Global, Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationHandlers } from '../apply/infrastructure/notification';
import { EventStore } from '../core/eventstore/eventstore';
import { EventStoreModule } from '../core/eventstore/eventstore.module';
import { CommandHandlers } from './application/handler';
import { MembersEvents } from './domain/events';
import { CommandController } from './infrastructure/controller/command.controller';
import { QueryController } from './infrastructure/controller/query.controller';
import { MembersProviders } from './infrastructure/members.providers';
import { QueryHandlers } from './infrastructure/query/handler';
import { MemberCardNumber } from './infrastructure/read-model/model/member-card.entity';
import { MemberExpulsionView } from './infrastructure/read-model/model/member-expulsion.entity';
import { MemberSuspensionView } from './infrastructure/read-model/model/member-suspension.entity';
import { MemberView } from './infrastructure/read-model/model/member.entity';
import { MembershipFeeView } from './infrastructure/read-model/model/membership-fee.entity';
import { Projections } from './infrastructure/read-model/projection';


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
    EventStoreModule,
  ],
  controllers: [CommandController, QueryController],
  providers: [
    ...CommandHandlers,
    ...Projections,
    ...NotificationHandlers,
    ...MembersProviders,
    ...QueryHandlers,
  ],
  exports: [...QueryHandlers],
})
export class MembersModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}
  onModuleInit() {
    this.eventStore.addEventHandlers(MembersEvents);
  }
}
