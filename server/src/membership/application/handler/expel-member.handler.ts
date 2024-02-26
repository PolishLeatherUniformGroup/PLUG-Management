import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExpelMemberCommand } from '../command/expel-member.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(ExpelMemberCommand)
export class ExpelMemberHandler implements ICommandHandler<ExpelMemberCommand> {
  constructor(private readonly members:MemberAggregateRepository, private readonly publisher:StoreEventPublisher) {}
  async execute(command: ExpelMemberCommand) {
    const member = await this.members.getById(Member,command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.expelMember(command.date, command.reason, new Date());
    member.commit();
  }
}
