import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MakeMemberRegularCommand } from '../command/make-member-regular.command';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { Inject } from '@nestjs/common';

@CommandHandler(MakeMemberRegularCommand)
export class MakeMemberRegularHandler
  implements ICommandHandler<MakeMemberRegularCommand>
{
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: MakeMemberRegularCommand): Promise<any> {
    const member = await this.members.get(command.id);
    if (!member) {
      throw new Error('Member not found');
    }
    member.makeRegularMember();
    this.members.save(member);
  }
}
