import { Module } from '@nestjs/common';
import { ApplyModule } from './apply/apply.module';
import { EventStoreModule } from './core/eventstore/eventstore.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ApplyModule, EventStoreModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'h27.seohost.pl',
    port: 3306,
    username: 'srv58017_plug_app',
    password: 'nijfos-tUqfyr-picva5',
    database: 'srv58017_plug_app',
    synchronize: true,
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    logging: false,
  })],
  controllers: [],
  providers: [
  ],
})

export class AppModule {}

