import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { APPLICANTS, Applicants } from "src/apply/domain/repository";
import { AcceptApplicationRejectionAppealCommand } from "../command/accept-application-rejection-appeal.command";

@CommandHandler(AcceptApplicationRejectionAppealCommand)
export class AcceptApplicationRejectionAppealHandler implements ICommandHandler<AcceptApplicationRejectionAppealCommand> {
    constructor(
        @Inject(APPLICANTS)private readonly applicants: Applicants,
    ) { }

    async execute(command: AcceptApplicationRejectionAppealCommand): Promise<any> {
        try {
            var applicant = await this.applicants.get(command.id);
            if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
            applicant.acceptApplicationRejectionAppeal(command.decisionDate,command.decision);
            this.applicants.save(applicant);
        } catch (error) {
            console.log(error);
        }
    }
}