import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ApplicantIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { APPLICANTS, Applicants } from "src/apply/domain/repository";
import { AppealApplicationRejectionCommand } from "../command/appeal-application-rejection.command";

@CommandHandler(AppealApplicationRejectionCommand)
export class AppealApplicationRejectionHandler implements ICommandHandler<AppealApplicationRejectionCommand> {
    constructor(
        @Inject(APPLICANTS)private readonly applicants: Applicants,
    ) { }

    async execute(command: AppealApplicationRejectionCommand): Promise<any> {
        try {
            var applicant = await this.applicants.get(command.id);
            if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
            applicant.appealApplicationRejection(command.appealDate,command.justification);
            this.applicants.save(applicant);
        } catch (error) {
            console.log(error);
        }
    }
}