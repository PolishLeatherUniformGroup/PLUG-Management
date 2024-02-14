import { Module, OnModuleInit } from '@nestjs/common';
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


@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([
        MemberView,
        MembershipFeeView,
        MemberCardNumber,
        MemberSuspensionView,
        MemberExpulsionView]), EventStoreModule],
    controllers: [CommandController],
    providers: [
        ...CommandHandlers,
        ...Projections,
        ...NotificationHandlers,
        ...MembersProviders
    ],
    exports: [],
})
export class MembersModule implements OnModuleInit {
    constructor(private readonly eventStore: EventStore) { }
    onModuleInit() {
        this.eventStore.addEventHandlers(MembersEvents);
    }
}
