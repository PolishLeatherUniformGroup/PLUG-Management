import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { ExpelMemberCommand } from '../command/expel-member.command';

@CommandHandler(ExpelMemberCommand)
export class ExpelMemberHandler implements ICommandHandler<ExpelMemberCommand> {
  constructor(@Inject(MEMBERS) private readonly members: Members) {}
  async execute(command: ExpelMemberCommand) {
    const member = await this.members.get(command.id);
    if (!member) {
      throw new Error('Member not found');
    }
    member.expelMember(command.date, command.reason, new Date());
    this.members.save(member);
  }
}
