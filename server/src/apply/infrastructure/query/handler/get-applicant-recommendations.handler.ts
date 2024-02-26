import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetApplicantRecommendationsQuery } from '../get-applicant-recommendations.query';
import { RecommendationView } from '../../read-model/model/recommendation.entity';
import { RecommendationDto } from '../../dto/recommendation.dto';

@QueryHandler(GetApplicantRecommendationsQuery)
export class GetApplicantRecommendationsHandler
  implements IQueryHandler<GetApplicantRecommendationsQuery>
{
  constructor(
    @InjectRepository(RecommendationView)
    private readonly repository: Repository<RecommendationView>,
  ) {}

  async execute(
    query: GetApplicantRecommendationsQuery,
  ): Promise<RecommendationView[]> {
    const q = JSON.parse(JSON.stringify(query.id));
    const recommendations = await this.repository.find({
      where: { applicant: { applicantId: q.id } },
    });

    return recommendations;
  }
}
