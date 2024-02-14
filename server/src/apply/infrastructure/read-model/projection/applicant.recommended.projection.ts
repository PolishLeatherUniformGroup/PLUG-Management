import { IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantRecommended } from 'src/apply/domain/events/applicant-recommended.event';
import { Repository } from 'typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { ApplicantId } from 'src/apply/domain/model';
import { ApplicantIdNotFound } from 'src/apply/domain/exception/applicant-id-not-found.error';
import { ApplicantStatus } from 'src/apply/domain/model/applicant-status';

export class ApplicantRecommendedProjection
  implements IEventHandler<ApplicantRecommended>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
  ) {}

  async handle(event: ApplicantRecommended) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { id: event.id },
      });
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      applicant.status = ApplicantStatus.AwaitsDecision;
      this.applicantRepository.save(applicant);
    } catch (error) {
      console.log(error);
    }
  }
}
