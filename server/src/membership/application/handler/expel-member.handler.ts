import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from '../../domain/repository/members';
import { ExpelMemberCommand } from '../command/expel-member.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(ExpelMemberCommand)
export class ExpelMemberHandler implements ICommandHandler<ExpelMemberCommand> {
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}
  async execute(command: ExpelMemberCommand) {
    const member = await this.members.getById(Member,command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.expelMember(command.date, command.reason, new Date());
    member.commit();
  }
}
