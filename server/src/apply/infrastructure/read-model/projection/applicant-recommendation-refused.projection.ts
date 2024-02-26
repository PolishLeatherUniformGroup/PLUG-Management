import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { ApplicantRecommendationRefused } from '../../../domain/events';
import {
  ApplicantIdNotFound,
  RecommendationIdNotFound,
} from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { RecommendationView } from '../model/recommendation.entity';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';

@EventsHandler(ApplicantRecommendationRefused)
export class ApplicantRecommendationRefusedProjection
  implements IViewUpdater<ApplicantRecommendationRefused>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
    @InjectRepository(RecommendationView)
    private readonly recommendationRepository: Repository<RecommendationView>,
  ) {}

  async handle(event: ApplicantRecommendationRefused) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { applicantId: event.id },
        loadEagerRelations: true,
      });
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      const recommendation = await this.recommendationRepository.findOne({
        where: { recommendationId: event.recommendationId },
      });
      if (!recommendation)
        throw RecommendationIdNotFound.withApplicantIdAndRecommendationId(
          ApplicantId.fromString(event.id),
          event.recommendationId,
        );
      recommendation.status = false;
      this.recommendationRepository.save(recommendation);
      applicant.status = ApplicantStatus.Rejected;
      this.applicantRepository.save(applicant);
    } catch (error) {
      console.trace(error);
    }
  }
}
