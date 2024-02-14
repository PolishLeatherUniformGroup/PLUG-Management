import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { Inject } from '@nestjs/common';
import { AppealMemberExpulsionCommand } from '../command/appeal-member-expulsion.command';

@CommandHandler(AppealMemberExpulsionCommand)
export class AppealMemberExpulsionHandler
  implements ICommandHandler<AppealMemberExpulsionCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: AppealMemberExpulsionCommand) {
    const member = await this.members.get(command.id);
    if (!member) {
      throw new Error('Member not found');
    }
    member.appealExpulsion(
      command.expulsionId,
      command.appealDate,
      command.justification,
    );
    this.members.save(member);
  }
}
