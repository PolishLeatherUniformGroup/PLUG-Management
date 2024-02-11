import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MembershipController } from './membership.controller';

@Module({ imports: [CqrsModule], controllers: [MembershipController] })
export class MembershipModule {}
