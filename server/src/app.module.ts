import { Module } from '@nestjs/common';
import { ApplyModule } from './apply/apply.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from './membership/members.module';
import { GatheringsModule } from './gatherings/gatherings.module';
import { TasksModule } from './tasks/tasks.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypedEventEmitterModule } from './event-emitter/event-emitter.module';
import { EventStoreModule } from './eventstore/eventstore.module';

@Module({
  imports: [
    ApplyModule,
    EventStoreModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'h27.seohost.pl',
      port: 3306,
      username: 'srv58017_plug_app',
      password: 'nijfos-tUqfyr-picva5',
      database: 'srv58017_plug_app',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      logging: false,
    }),
    MembersModule,
    GatheringsModule,
    TasksModule,
    SettingsModule,
    AuthModule,
    EmailModule,
    TypedEventEmitterModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
