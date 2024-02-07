import { ApplicantRepository } from "src/apply/repository/applicant.repository";
import { SendApplicationCommand } from "../impl/send-application.command";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Applicant } from "src/apply/model/applicant.model";
import { randomUUID } from "crypto";

@CommandHandler(SendApplicationCommand)
export class SendApplicationHandler implements ICommandHandler<SendApplicationCommand>{
    constructor(
        private readonly repository:ApplicantRepository,
        private readonly eventPublisher:EventPublisher
    ) {}

    async execute(command: SendApplicationCommand): Promise<any> {
        const applicant = this.eventPublisher.mergeObjectContext(new Applicant(
                randomUUID().toLowerCase(),
                command.firstName,
                command.lastName,
                command.email,
                command.phone,
                command.birthDate,
                command.address,
                command.recommenders
        ));
        this.repository.save(applicant);
        applicant.commit();
        
    }

}