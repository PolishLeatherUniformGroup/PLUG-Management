import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RejectApplicantCommand } from "../impl/reject-applicant.command";
import { ApplicantRepository } from "src/apply/repository/applicant.repository";

@CommandHandler(RejectApplicantCommand)
export class RejectApplicantHandler implements ICommandHandler<RejectApplicantCommand>{
    constructor(
        private readonly repository:ApplicantRepository,
        private readonly eventPublisher:EventPublisher
    ){}

    async execute(command: RejectApplicantCommand): Promise<any> {
        const applicant = this.eventPublisher.mergeObjectContext(
            await this.repository.get(command.id)
        );
        // read setting
        let appealDate = new Date(command.date);
        appealDate.setDate(command.date.getDate()+14);
        
        applicant.reject(command.date, command.reason,appealDate);
        await this.repository.save(applicant);
        applicant.commit();
    }

}