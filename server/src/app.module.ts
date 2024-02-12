import { Module } from '@nestjs/common';
import { ApplyModule } from './apply/apply.module';
import { MembershipModule } from './membership/membership.module';
import { EventsModule } from './events/events.module';
import { VotingModule } from './voting/voting.module';
import { TasksModule } from './tasks/tasks.module';
import { SettingsModule } from './settings/settings.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [ApplyModule, MembershipModule, EventsModule, VotingModule, TasksModule, SettingsModule, AuthorizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
