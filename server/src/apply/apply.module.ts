import { Get, Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from '../core/eventstore/eventstore.module';
import { ApplyController } from './infrastructure/controller/apply.controller';
import { CommandHandlers } from './application/handler';
import { Projections } from './infrastructure/read-model/projection';
import { ApplyProviders } from './infrastructure/apply.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantView } from './infrastructure/read-model/model/applicant.entity';
import { RecommendationView } from './infrastructure/read-model/model/recommendation.entity';
import { NotificationHandlers } from './infrastructure/notification';
import { QueryHandlers } from './infrastructure/query/handler';
import { EventStore } from '../core/eventstore/eventstore';
import { ApplyEvents } from './domain/events';
import { CommandController } from './infrastructure/controller/command.controller';
import { QueryController } from './infrastructure/controller/query.controller';
import { EmailModule } from '../email/email.module';
import { MembersModule } from '../membership/members.module';
import { VerificationService } from '../membership/application/service/verification.service';
import { MemberView } from '../membership/infrastructure/read-model/model/member.entity';
import { ApplyService } from './application/service/apply.service';
import { GetMemberHandler } from '../membership/infrastructure/query/handler/get-member.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ApplicantView, RecommendationView, MemberView]),
    EventStoreModule,
    EmailModule,
    MembersModule,
  ],
  controllers: [ApplyController, QueryController, CommandController],
  providers: [
    ...CommandHandlers,
    ...Projections,
    ...ApplyProviders,
    ...NotificationHandlers,
    ...QueryHandlers,
    VerificationService,
    GetMemberHandler,
    ApplyService,
  ],
})
export class ApplyModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}
  onModuleInit() {
    this.eventStore.addEventHandlers(ApplyEvents);
  }
}
