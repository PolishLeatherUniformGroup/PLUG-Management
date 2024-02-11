import { MemberRepository } from "src/membership/repository/member.repository";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AppealExpellCommand } from "../impl/appeal-expell.command";

@CommandHandler(AppealExpellCommand)
export class AppealExpellHandler implements ICommandHandler<AppealExpellCommand> {
    constructor(
        private readonly repository: MemberRepository,
        private readonly eventPublisher: EventPublisher,
    ) { }

    async execute(command: AppealExpellCommand) {
        const member = this.eventPublisher.mergeObjectContext( await this.repository.get(command.memberId));
        
        member.appealExpell(command.date, command.reason);
        await this.repository.save(member);
        member.commit();
    }
}