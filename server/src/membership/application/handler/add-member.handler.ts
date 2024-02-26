import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Member } from "../../domain/model/member";
import { MEMBERS, Members } from "../../domain/repository/members";
import { AddMemberCommand } from "../command/add-member.command";


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
      console.trace(error);
    }
  }
}
