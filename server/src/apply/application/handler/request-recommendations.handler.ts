import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RequestRecommendations } from "../command/request-recommendations.command";
import { APPLICANTS, Applicants } from "src/apply/domain/repository";
import { Inject } from "@nestjs/common";
import { ApplicantIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { Applicant } from "src/apply/domain/model";

@CommandHandler(RequestRecommendations)
export class RequestRecommendationsHandler implements ICommandHandler<RequestRecommendations> {
    constructor(
        @Inject(APPLICANTS) private readonly applicants: Applicants,
    ) { }

    async execute(command: RequestRecommendations): Promise<any> {
        try{
            const applicant:Applicant|null = await this.applicants.get(command.applicantId);
            if(!applicant) throw  ApplicantIdNotFound.withApplicantId(command.applicantId);
           
            (applicant as Applicant).requestRecommendations(command.requestDate, command.requiredFee);
            this.applicants.save(applicant);
        }catch(error){
            throw new Error(error.message);
        }
    }
}