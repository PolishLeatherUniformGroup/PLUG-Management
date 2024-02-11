import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { MemberRepository } from "src/membership/repository/member.repository";
import { ExpireMembershipCommand } from "../impl/expire-mmbership.command";

@CommandHandler(ExpireMembershipCommand)
export class ExpireMembershipHandler implements ICommandHandler<ExpireMembershipCommand> {
    constructor(
        private readonly repository: MemberRepository,
        private readonly eventPublisher: EventPublisher) {
    }
    async execute(command: ExpireMembershipCommand): Promise<any> {
        const member = this.eventPublisher.mergeObjectContext(await this.repository.get(command.memberId));
        member.expireMembership(command.date);
        await this.repository.save(member);
        member.commit();
    }

}