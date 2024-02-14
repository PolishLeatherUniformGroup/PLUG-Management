import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AppealMembershipSuspensionCommand } from "../command/appeal-membership-suspension.command";
import { MEMBERS, Members } from "src/membership/domain/repository/members";
import { Inject } from "@nestjs/common";

@CommandHandler(AppealMembershipSuspensionCommand)
export class AppealMembershipSuspensionHandler implements ICommandHandler<AppealMembershipSuspensionCommand> {
    constructor(
        @Inject(MEMBERS) private readonly members: Members,
    ) {
    }

    async execute(command: AppealMembershipSuspensionCommand) {
        const member = await this.members.get(command.id);
        if(!member) { throw new Error('Member not found'); }
        member.appealSuspension(command.suspensionId, command.appealDate, command.justification);
        this.members.save(member);
    }
}