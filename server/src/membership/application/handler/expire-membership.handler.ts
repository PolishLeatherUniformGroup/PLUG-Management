import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExpireMembershipCommand } from '../command/expire-membership.command';
import { Inject } from '@nestjs/common';
import { MEMBERS, Members } from '../../domain/repository/members';

@CommandHandler(ExpireMembershipCommand)
export class ExpireMembershipHandler
  implements ICommandHandler<ExpireMembershipCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: ExpireMembershipCommand) {
    const member = await this.members.get(command.id);
    if (!member) {
      throw new Error('Member not found');
    }
    member.expireMembership(command.date);
    this.members.save(member);
  }
}
