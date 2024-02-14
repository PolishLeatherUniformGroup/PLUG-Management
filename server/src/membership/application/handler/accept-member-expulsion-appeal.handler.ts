import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { Inject } from '@nestjs/common';
import { AcceptMemberExpulsionAppealCommand } from '../command/accept-member-expulsion-appeal.command';

@CommandHandler(AcceptMemberExpulsionAppealCommand)
export class AcceptMemberExpulsionAppealHandler
  implements ICommandHandler<AcceptMemberExpulsionAppealCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: AcceptMemberExpulsionAppealCommand) {
    const member = await this.members.get(command.memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    member.acceptExpulsionAppeal(
      command.expulsionId,
      command.date,
      command.reason,
    );
    this.members.save(member);
  }
}
