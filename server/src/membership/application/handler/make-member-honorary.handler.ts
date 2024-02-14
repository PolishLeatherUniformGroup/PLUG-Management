import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { MEMBERS, Members } from "src/membership/domain/repository/members";
import { Inject } from "@nestjs/common";
import { MakeMemberHonoraryCommand } from "../command/make-member-honorary.command";

@CommandHandler(MakeMemberHonoraryCommand)
export class MakeMemberHonoraryHandler implements ICommandHandler<MakeMemberHonoraryCommand>{
    constructor(
        @Inject(MEMBERS) private readonly members: Members
    ) { }

    async execute(command: MakeMemberHonoraryCommand): Promise<any> {
        const member = await this.members.get(command.id);
        if (!member) {
            throw new Error('Member not found');
        }
        member.makeRegularMember();
        this.members.save(member);
    }
}