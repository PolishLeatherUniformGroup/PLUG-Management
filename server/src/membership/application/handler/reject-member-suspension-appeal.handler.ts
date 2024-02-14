import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { Inject } from '@nestjs/common';
import { RejectMemberSuspensionAppealCommand } from '../command/reject-member-suspension-appeal.command';

@CommandHandler(RejectMemberSuspensionAppealCommand)
export class RejectMemberSuspensionAppealHandler
  implements ICommandHandler<RejectMemberSuspensionAppealCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: RejectMemberSuspensionAppealCommand) {
    const member = await this.members.get(command.memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    member.rejectSuspensionAppeal(
      command.suspensionId,
      command.date,
      command.reason,
    );
    this.members.save(member);
  }
}
