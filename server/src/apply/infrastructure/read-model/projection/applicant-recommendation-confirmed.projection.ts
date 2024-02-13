import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicantRecommendationConfirmed } from "src/apply/domain/events/applicant-recommendation-confirmed.event";
import { Repository } from "typeorm";
import { ApplicantView } from "../model/applicant.entity";
import { RecommendationView } from "../model/recommendation.entity";
import { ApplicantIdNotFound, RecommendationIdNotFound } from "src/apply/domain/exception/applicant-id-not-found.error";
import { ApplicantId } from "src/apply/domain/model";

@EventsHandler(ApplicantRecommendationConfirmed)
export class ApplicantRecommendationConfirmedProjection implements IEventHandler<ApplicantRecommendationConfirmed>{
    constructor(
        @InjectRepository(ApplicantView) private readonly applicantRepository: Repository<ApplicantView>,
        @InjectRepository(RecommendationView) private readonly recommendationRepository: Repository<RecommendationView>
    ) { }

   async handle(event: ApplicantRecommendationConfirmed) {
        try {
            const applicant = await this.applicantRepository.findOne({ where: { id: event.id }, loadEagerRelations: true });
            if (!applicant) throw ApplicantIdNotFound.withApplicantId(ApplicantId.fromString(event.id));
            const recommendation = applicant.recommendations.find(r => r.id === event.recommendationId);
            if(!recommendation) throw RecommendationIdNotFound.withApplicantIdAndRecommendationId(ApplicantId.fromString(event.id), event.recommendationId);
            recommendation.status = true;
            this.recommendationRepository.save(recommendation);
        }catch(error){
            console.log(error);
        }
    }
    
}