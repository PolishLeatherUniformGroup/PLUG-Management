import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddMemberCommand } from '../command/add-member.command';
import { MEMBERS, Members } from 'src/membership/domain/repository/members';
import { Inject } from '@nestjs/common';
import { Member } from 'src/membership/domain/model/member';

@CommandHandler(AddMemberCommand)
export class AddMemberHandler implements ICommandHandler<AddMemberCommand> {
  constructor(@Inject(MEMBERS) private readonly members: Members) {}

  async execute(command: AddMemberCommand): Promise<void> {
    try {
      const member = Member.add(
        command.memberId,
        command.card,
        command.firstName,
        command.lastName,
        command.email,
        command.phoneNumber,
        command.joinDate,
        command.birthDate,
        command.address,
        command.initialFee,
      );
      this.members.save(member);
    } catch (error) {
      console.log(error);
    }
  }
}
