import { Global, Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './application/handler';
import { MembersEvents } from './domain/events';
import { CommandController } from './infrastructure/controller/command.controller';
import { QueryController } from './infrastructure/controller/query.controller';
import { QueryHandlers } from './infrastructure/query/handler';
import { MemberCardNumber } from './infrastructure/read-model/model/member-card.entity';
import { MemberExpulsionView } from './infrastructure/read-model/model/member-expulsion.entity';
import { MemberSuspensionView } from './infrastructure/read-model/model/member-suspension.entity';
import { MemberView } from './infrastructure/read-model/model/member.entity';
import { MembershipFeeView } from './infrastructure/read-model/model/membership-fee.entity';
import { Projections } from './infrastructure/read-model/projection';
import { EventStoreModule } from '../eventstore/eventstore.module';
import { MemberAggregateRepository } from './infrastructure/repository/member-aggregate-repository';

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
    EventStoreModule.forFeature(),
  ],
  controllers: [CommandController, QueryController],
  providers: [
    ...CommandHandlers,
    ...Projections,
    ...QueryHandlers,
    MemberAggregateRepository,
  ],
  exports: [...QueryHandlers],
})
export class MembersModule {}
