import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { MemberRepository } from "src/membership/repository/member.repository";
import { RejectExpellAppealCommand } from "../impl/reject-expell-appeal.command";

@CommandHandler(RejectExpellAppealCommand)
export class RejectExpellAppealHandler implements ICommandHandler<RejectExpellAppealCommand> {
    constructor(
        private readonly repository: MemberRepository,
        private readonly eventPublisher: EventPublisher,
    ) { }

    async execute(command: RejectExpellAppealCommand) {
        const member = this.eventPublisher.mergeObjectContext( await this.repository.get(command.memberId));
        
        member.rejectExpellAppeal(command.date, command.reason);
        await this.repository.save(member);
        member.commit();
    }
}