import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExpireMembershipCommand } from '../command/expire-membership.command';
import { CancelMembershipCommand } from '../command/cancel-membership.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(CancelMembershipCommand)
export class CancelMembershipHandler
  implements ICommandHandler<CancelMembershipCommand>
{
  constructor(private readonly members:MemberAggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: ExpireMembershipCommand) {
    const member = await this.members.getById(Member,command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.cancelMembership(command.date);
    member.commit();
  }
}
