import { Module } from '@nestjs/common';
import { ApplyModule } from './apply/apply.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [ApplyModule, MembershipModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
