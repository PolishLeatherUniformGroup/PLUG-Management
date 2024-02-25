import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from '../../domain/repository/members';
import { Inject } from '@nestjs/common';
import { RejectMemberExpulsionAppealCommand } from '../command/reject-member-expulsion-appeal.command';

@CommandHandler(RejectMemberExpulsionAppealCommand)
export class RejectMemberExpulsionAppealHandler
  implements ICommandHandler<RejectMemberExpulsionAppealCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: RejectMemberExpulsionAppealCommand) {
    const member = await this.members.get(command.memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    member.rejectExpulsionAppeal(
      command.expulsionId,
      command.date,
      command.reason,
    );
    this.members.save(member);
  }
}
