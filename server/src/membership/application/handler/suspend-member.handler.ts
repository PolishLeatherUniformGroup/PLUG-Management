import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SuspendMemberCommand } from '../command/suspend-member.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(SuspendMemberCommand)
export class SuspendMemberHandler
  implements ICommandHandler<SuspendMemberCommand>
{
  constructor(private readonly members:MemberAggregateRepository, private readonly publisher:StoreEventPublisher) {}
  async execute(command: SuspendMemberCommand) {
    const member = await this.members.getById(Member,command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.suspendMember(
      command.date,
      command.reason,
      command.suspensionEndDate,
      new Date(),
    );
    member.commit();
  }
}
