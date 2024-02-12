import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from 'src/core/eventstore/eventstore.module';
import { ApplyController } from './infrastructure/controller/apply.controller';
import { CommandHandlers} from './application/handler'
import { Projections } from './infrastructure/read-model/projection';
import { ApplyProviders } from './infrastructure/apply.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantView } from './infrastructure/read-model/model/applicant.entity';
import { RecommendationView } from './infrastructure/read-model/model/recommendation.entity';

@Module({
    imports: [CqrsModule,TypeOrmModule.forFeature([ApplicantView, RecommendationView]), EventStoreModule],
    controllers: [ApplyController],
    providers: [
        ...CommandHandlers,
        ...Projections,
        ...ApplyProviders,
    ],
})
export class ApplyModule {}
