import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MEMBERS, Members } from "src/membership/domain/repository/members";
import { AssignCardNumberCommand } from "../command/assign-card-number.command";

@CommandHandler(AssignCardNumberCommand)
export class AssignCardNumberHandler implements ICommandHandler<AssignCardNumberCommand> {
    constructor(
        @Inject(MEMBERS) private readonly members: Members
    ) {}

    async execute(command: AssignCardNumberCommand) {
        const member = await this.members.get(command.id);
        if(!member) {throw new Error('Member not found')}
        member.assignCardNumber(command.card);
        await this.members.save(member);
    }
}