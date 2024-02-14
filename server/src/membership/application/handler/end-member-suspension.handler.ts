import { ICommandHandler } from "@nestjs/cqrs";
import { EndMemberSuspensionCommand } from "../command/end-member-suspension.command";
import { Inject } from "@nestjs/common";
import { MEMBERS, Members } from "src/membership/domain/repository/members";

export class EndMemberSuspensionHandler implements ICommandHandler<EndMemberSuspensionCommand>{
    constructor(
        @Inject(MEMBERS) private readonly members: Members
    ) { }

    async execute(command: EndMemberSuspensionCommand) {
        const member = await this.members.get(command.memberId);
        if (!member) {
            throw new Error("Member not found");
        }
        member.endSuspension();
        this.members.save(member);
    }

}