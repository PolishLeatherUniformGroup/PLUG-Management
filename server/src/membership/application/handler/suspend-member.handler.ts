import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from '../../domain/repository/members';
import { SuspendMemberCommand } from '../command/suspend-member.command';

@CommandHandler(SuspendMemberCommand)
export class SuspendMemberHandler
  implements ICommandHandler<SuspendMemberCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}
  async execute(command: SuspendMemberCommand) {
    const member = await this.members.get(command.id);
    if (!member) {
      throw new Error('Member not found');
    }
    member.suspendMember(
      command.date,
      command.reason,
      command.suspensionEndDate,
      new Date(),
    );
    this.members.save(member);
  }
}
