import { IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantRecommended } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { ApplicantView } from '../model/applicant.entity';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';

export class ApplicantRecommendedProjection
  implements IViewUpdater<ApplicantRecommended>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
  ) {}

  async handle(event: ApplicantRecommended) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { applicantId: event.id },
      });
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      applicant.status = ApplicantStatus.AwaitsDecision;
      this.applicantRepository.save(applicant);
    } catch (error) {
      console.trace(error);
    }
  }
}
