import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AcceptMemberSuspensionAppealCommand } from "../command/accept-member-suspension-appeal.command";
import { MEMBERS, Members } from "src/membership/domain/repository/members";
import { Inject } from "@nestjs/common";

@CommandHandler(AcceptMemberSuspensionAppealCommand)
export class AcceptMemberSuspensionAppealHandler implements ICommandHandler<AcceptMemberSuspensionAppealCommand> {
    constructor(
        @Inject(MEMBERS) private readonly members: Members
    ) { }

    async execute(command: AcceptMemberSuspensionAppealCommand) {
        const member = await this.members.get(command.memberId);
        if (!member) {
            throw new Error('Member not found');
        }
        member.acceptSuspensionAppeal(command.suspensionId, command.date, command.reason);
        this.members.save(member);
    }
}