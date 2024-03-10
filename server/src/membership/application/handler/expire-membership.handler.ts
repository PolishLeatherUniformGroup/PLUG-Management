import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExpireMembershipCommand } from '../command/expire-membership.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(ExpireMembershipCommand)
export class ExpireMembershipHandler
  implements ICommandHandler<ExpireMembershipCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: ExpireMembershipCommand) {
    const member = this.publisher.mergeObjectContext(
      await this.members.getById(Member, command.id.value),
    );
    if (!member) {
      throw new Error('Member not found');
    }
    member.expireMembership(command.date);
    member.commit();
  }
}
