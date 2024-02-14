import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicantView } from "../model/applicant.entity";
import { RecommendationView } from "../model/recommendation.entity";
import { ApplicantIdNotFound, RecommendationIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { ApplicantId } from "src/apply/domain/model";
import { ApplicantRecommendationRefused } from "src/apply/domain/events/applicant-recommendation-refused.event";
import { ApplicantStatus } from "src/apply/domain/model/applicant-status";

@EventsHandler(ApplicantRecommendationRefused)
export class ApplicantRecommendationRefusedProjection implements IEventHandler<ApplicantRecommendationRefused>{
    constructor(
        @InjectRepository(ApplicantView) private readonly applicantRepository: Repository<ApplicantView>,
        @InjectRepository(RecommendationView) private readonly recommendationRepository: Repository<RecommendationView>
    ) { }

   async handle(event: ApplicantRecommendationRefused) {
        try {
            const applicant = await this.applicantRepository.findOne({ where: { id: event.id }, loadEagerRelations: true });
            if (!applicant) throw ApplicantIdNotFound.withApplicantId(ApplicantId.fromString(event.id));
            const recommendation = await this.recommendationRepository.findOne({ where: { id: event.recommendationId } });
            if(!recommendation) throw RecommendationIdNotFound.withApplicantIdAndRecommendationId(ApplicantId.fromString(event.id), event.recommendationId);
            recommendation.status = false;
            this.recommendationRepository.save(recommendation);
            applicant.status = ApplicantStatus.Rejected;
            this.applicantRepository.save(applicant);
        }catch(error){
            console.log(error);
        }
    }
    
}