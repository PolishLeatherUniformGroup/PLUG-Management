import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicantRecommendationsRequested } from "src/apply/domain/events/applicant-recommendations-requested.event";
import { ApplicantView } from "../model/applicant.entity";
import { RecommendationView } from "../model/recommendation.entity";
import { Repository } from "typeorm";
import { ApplicantStatus } from "src/apply/domain/model/applicant-status";
import { ApplicantIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { ApplicantId } from "src/apply/domain/model";

@EventsHandler(ApplicantRecommendationsRequested)
export class ApplicantRecommendationsRequestedProjection implements IEventHandler<ApplicantRecommendationsRequested> {
    constructor(
        @InjectRepository(ApplicantView) private readonly applicantRepository: Repository<ApplicantView>,
        @InjectRepository(RecommendationView) private readonly recommendationRepository: Repository<RecommendationView>
    ) { }

    async handle(event: ApplicantRecommendationsRequested) {
        try {   
            const applicant = await this.applicantRepository.findOne({ where:{id: event.id}});
            if (!applicant) throw ApplicantIdNotFound.withApplicantId(ApplicantId.fromString(event.id));
            applicant.status = ApplicantStatus.InRecommendation;
            applicant.requiredFeeAmount = event.requiredFee.amount;
            applicant.feeCurrency = event.requiredFee.currency;
            console.log('Applicant:', applicant);
            const recommendations = await this.recommendationRepository.find({ where: {applicant: {id: event.id}}});
            recommendations.forEach( r => {
                r.requestDate = event.requestDate;
                this.recommendationRepository.save(r);
            });
            this.applicantRepository.save(applicant);
        } catch (e) {
            console.log('error: ', e)
        }
    }

}

