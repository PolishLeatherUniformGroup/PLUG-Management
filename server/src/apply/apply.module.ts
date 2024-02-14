import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule } from 'src/core/eventstore/eventstore.module';
import { ApplyController } from './infrastructure/controller/apply.controller';
import { CommandHandlers} from './application/handler'
import { Projections } from './infrastructure/read-model/projection';
import { ApplyProviders } from './infrastructure/apply.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantView } from './infrastructure/read-model/model/applicant.entity';
import { RecommendationView } from './infrastructure/read-model/model/recommendation.entity';
import { NotificationHandlers } from './infrastructure/notification';
import { QueryHandlers } from './infrastructure/query/handler';
import { EventStore } from 'src/core/eventstore/eventstore';
import { eventHandlers } from './domain/events';
import { CommandController } from './infrastructure/controller/command.controller';
import { QueryController } from './infrastructure/controller/query.controller';

@Module({
    imports: [CqrsModule,TypeOrmModule.forFeature([ApplicantView, RecommendationView]), EventStoreModule],
    controllers: [ApplyController, QueryController, CommandController],
    providers: [
        ...CommandHandlers,
        ...Projections,
        ...ApplyProviders,
        ...NotificationHandlers,
        ...QueryHandlers
    ],
})
export class ApplyModule  implements OnModuleInit{
    constructor(private readonly eventStore: EventStore) {}
    onModuleInit() {
       this.eventStore.addEventHandlers(eventHandlers);
    }
}
