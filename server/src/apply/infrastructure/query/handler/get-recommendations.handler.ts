import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RecommendationView } from '../../read-model/model/recommendation.entity';
import { GetRecommendationsQuery } from '../get-recommendations.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantStatus } from '../../../domain/model';

@QueryHandler(GetRecommendationsQuery)
export class GetRecommendationsHandler
  implements IQueryHandler<GetRecommendationsQuery, RecommendationView[]>
{
  constructor(
    @InjectRepository(RecommendationView)
    private readonly repository: Repository<RecommendationView>,
  ) {}
  async execute(query): Promise<RecommendationView[]> {
    const id = query.id;
    const recommendations = await this.repository.find({
      where: {
        cardNumber: id['id'],
        applicant: { status: ApplicantStatus.InRecommendation },
      },
      relations: { applicant: true },
    });
    return recommendations;
  }
}
