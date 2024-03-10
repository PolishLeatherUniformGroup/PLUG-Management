import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './application/handler';
import { Projections } from './infrastructure/read-model/projection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantView } from './infrastructure/read-model/model/applicant.entity';
import { RecommendationView } from './infrastructure/read-model/model/recommendation.entity';
import { QueryHandlers } from './infrastructure/query/handler';
import { CommandController } from './infrastructure/controller/command.controller';
import { QueryController } from './infrastructure/controller/query.controller';
import { EmailModule } from '../email/email.module';
import { MembersModule } from '../membership/members.module';
import { VerificationService } from '../membership/application/service/verification.service';
import { MemberView } from '../membership/infrastructure/read-model/model/member.entity';
import { ApplyService } from './application/service/apply.service';
import { GetMemberHandler } from '../membership/infrastructure/query/handler/get-member.handler';
import { EventStoreModule } from '../eventstore/eventstore.module';
import { ApplicantAggregateRepository } from './infrastructure/repository/applicant-aggregate-repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ApplicantView, RecommendationView, MemberView]),
    EventStoreModule.forFeature(),
    EmailModule,
    MembersModule,
  ],
  controllers: [QueryController, CommandController],
  providers: [
    ...CommandHandlers,
    ...Projections,
    ...QueryHandlers,
    VerificationService,
    GetMemberHandler,
    ApplyService,
    ApplicantAggregateRepository,
  ],
})
export class ApplyModule {}
