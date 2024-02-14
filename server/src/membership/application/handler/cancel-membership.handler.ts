import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExpireMembershipCommand } from '../command/expire-membership.command';
import { Inject } from '@nestjs/common';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { CancelMembershipCommand } from '../command/cancel-membership.command';

@CommandHandler(CancelMembershipCommand)
export class CancelMembershipHandler
  implements ICommandHandler<CancelMembershipCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: ExpireMembershipCommand) {
    const member = await this.members.get(command.id);
    if (!member) {
      throw new Error('Member not found');
    }
    member.cancelMembership(command.date);
    this.members.save(member);
  }
}
