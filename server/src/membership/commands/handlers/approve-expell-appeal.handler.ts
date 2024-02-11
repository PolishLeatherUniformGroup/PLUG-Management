import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { MemberRepository } from "src/membership/repository/member.repository";
import { ApproveExpellAppealCommand } from "../impl/approve-expell-appeal.command";

@CommandHandler(ApproveExpellAppealCommand)
export class ApproveExpellAppealHandler implements ICommandHandler<ApproveExpellAppealCommand> {
    constructor(
        private readonly repository: MemberRepository,
        private readonly eventPublisher: EventPublisher,
    ) { }

    async execute(command: ApproveExpellAppealCommand) {
        const member = this.eventPublisher.mergeObjectContext( await this.repository.get(command.memberId));
        
        member.approveExpellAppeal(command.date, command.reason);
        await this.repository.save(member);
        member.commit();
    }
}