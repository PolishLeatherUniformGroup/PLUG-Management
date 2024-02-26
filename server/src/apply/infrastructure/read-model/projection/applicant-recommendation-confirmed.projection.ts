import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantRecommendationConfirmed } from '../../../domain/events';
import {
  ApplicantIdNotFound,
  RecommendationIdNotFound,
} from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId } from '../../../domain/model';
import { ApplicantView } from '../model/applicant.entity';
import { RecommendationView } from '../model/recommendation.entity';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';

@EventsHandler(ApplicantRecommendationConfirmed)
export class ApplicantRecommendationConfirmedProjection
  implements IViewUpdater<ApplicantRecommendationConfirmed>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
    @InjectRepository(RecommendationView)
    private readonly recommendationRepository: Repository<RecommendationView>,
  ) {}

  async handle(event: ApplicantRecommendationConfirmed) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { id: event.id },
      });
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      const recommendation = await this.recommendationRepository.findOne({
        where: { id: event.recommendationId },
      });
      if (!recommendation)
        throw RecommendationIdNotFound.withApplicantIdAndRecommendationId(
          ApplicantId.fromString(event.id),
          event.recommendationId,
        );
      recommendation.status = true;
      this.recommendationRepository.save(recommendation);
    } catch (error) {
      console.trace(error);
    }
  }
}
