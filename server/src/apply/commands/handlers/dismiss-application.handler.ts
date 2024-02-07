import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DismissApplicationCommand } from "../impl/dismiss-application.command";
import { ApplicantRepository } from "src/apply/repository/applicant.repository";

@CommandHandler(DismissApplicationCommand)
export class DismissApplicationHandler implements ICommandHandler<DismissApplicationCommand>{
    constructor(
        private readonly repository: ApplicantRepository,
        private readonly eventPublisher: EventPublisher
    ) { }

    async execute(command: DismissApplicationCommand): Promise<any> {
        const applicant = this.eventPublisher.mergeObjectContext(
            await this.repository.get(command.id));

        applicant.dismissApplicant();
        await this.repository.save(applicant);
        applicant.commit();
    }

}