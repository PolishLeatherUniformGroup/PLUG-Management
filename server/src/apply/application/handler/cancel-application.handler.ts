import { ICommandHandler } from "@nestjs/cqrs";
import { CancelApplicationCommand } from "../command/cancel-application.command";
import { Inject } from "@nestjs/common";
import { APPLICANTS, Applicants } from "src/apply/domain/repository";
import { ApplicantIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";

export class CancelApplicationHandler implements ICommandHandler<CancelApplicationCommand>{
    constructor(
        @Inject(APPLICANTS) private readonly applicants: Applicants,
    ) { }

    async execute(command: CancelApplicationCommand): Promise<any> {
        try{
            var applicant = await this.applicants.get(command.applicantId);
            if(!applicant) throw  ApplicantIdNotFound.withApplicantId(command.applicantId);
            applicant.cancelApplication();
            this.applicants.save(applicant);
        }catch(error){
            console.log(error);
        }
    }

};