import { Module } from '@nestjs/common';
import { ApplyModule } from './apply/apply.module';

@Module({
  imports: [ApplyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
