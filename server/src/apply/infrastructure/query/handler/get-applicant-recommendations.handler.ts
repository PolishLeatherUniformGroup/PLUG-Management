import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetApplicantRecommendationsQuery } from "../get-applicant-recommendations.query";
import { RecommendationView } from "../../read-model/model/recommendation.entity";
import { RecommendationDto } from "../../dto/recommendation.dto";

@QueryHandler(GetApplicantRecommendationsQuery)
export class GetApplicantRecommendationsHandler implements IQueryHandler<GetApplicantRecommendationsQuery> {
  constructor(
    @InjectRepository(RecommendationView) private readonly repository: Repository<RecommendationView>) { }

  async execute(query: GetApplicantRecommendationsQuery): Promise<RecommendationDto[]> {
    const q = JSON.parse(JSON.stringify(query.id));
    console.log('Query:', q);
    const recommendations = await this.repository.find({ where: { applicant: {id: q.id} } });
  
    return recommendations.map((recommendation) => {
        return {
            id: recommendation.id,
            cardNumber: recommendation.cardNumber,
            requestDate: recommendation.requestDate,
            isConfirmed: recommendation.status === true, 
            isRefused: recommendation.status === false
         } as RecommendationDto
    });
  }
}