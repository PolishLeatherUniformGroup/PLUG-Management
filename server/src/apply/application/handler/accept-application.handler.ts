import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { APPLICANTS, Applicants } from "src/apply/domain/repository";
import { AcceptApplicationCommand } from "../command/accept-application.command";

@CommandHandler(AcceptApplicationCommand)
export class AcceptApplicationHandler implements ICommandHandler<AcceptApplicationCommand> {
    constructor(
        @Inject(APPLICANTS)private readonly applicants: Applicants,
    ) { }

    async execute(command: AcceptApplicationCommand): Promise<any> {
        try {
            var applicant = await this.applicants.get(command.id);
            if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
            applicant.acceptApplication(command.decisionDate,command.decision);
            this.applicants.save(applicant);
        } catch (error) {
            console.log(error);
        }
    }
}