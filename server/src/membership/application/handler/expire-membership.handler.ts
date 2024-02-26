import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExpireMembershipCommand } from '../command/expire-membership.command';
import { Inject } from '@nestjs/common';
import { MEMBERS, Members } from '../../domain/repository/members';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';

@CommandHandler(ExpireMembershipCommand)
export class ExpireMembershipHandler
  implements ICommandHandler<ExpireMembershipCommand>
{
  constructor(private readonly members:AggregateRepository, private readonly publisher:StoreEventPublisher) {}

  async execute(command: ExpireMembershipCommand) {
    const member = this.publisher.mergeObjectContext(await this.members.getById(Member,command.id.value));
    if (!member) {
      throw new Error('Member not found');
    }
    member.expireMembership(command.date);
    member.commit();
  }
}
