import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RequestRecommendationCommand } from "../impl/request-recommendation.command";
import { ApplicantRepository } from "src/apply/repository/applicant.repository";

@CommandHandler(RequestRecommendationCommand)
export class RequestRecommendationHandler implements ICommandHandler<RequestRecommendationCommand>{
    constructor(
        private readonly repository: ApplicantRepository,
        private readonly eventPublisher:EventPublisher
    ){}

    async execute(command: RequestRecommendationCommand): Promise<any> {
        const applicant = this.eventPublisher.mergeObjectContext(
            await this.repository.get(command.id)
        );

        applicant.requestRecommendation(command.date,command.requiredFee);
        await this.repository.save(applicant);
        applicant.commit();
    }

}