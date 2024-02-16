import { IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { ApplicantAccepted } from 'src/apply/domain/events/applicant-accepted.event';
import { Repository } from 'typeorm';
import { ApplicantIdNotFound } from 'src/apply/domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from 'src/apply/domain/model';

export class ApplicationAcceptedProjection
  implements IEventHandler<ApplicantAccepted>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
  ) {}

  public async handle(event: ApplicantAccepted): Promise<void> {
    const application = await this.repository.findOne({
      where: { id: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.status = ApplicantStatus.Accepted;
    application.decision = event.decision;
    application.decisionDate = event.date;
    await this.repository.save(application);
  }
}
