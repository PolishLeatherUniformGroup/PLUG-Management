import { IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../domain/model';
import { ApplicantRejected } from '../../domain/events/applicant-rejected.event';

export class ApplicationRejectedProjection
  implements IEventHandler<ApplicantRejected>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
  ) {}

  public async handle(event: ApplicantRejected): Promise<void> {
    const application = await this.repository.findOne({
      where: { id: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.status = ApplicantStatus.Accepted;
    application.decision = event.reason;
    application.decisionDate = event.date;
    application.appealDeadline = event.appealDeadline;
    await this.repository.save(application);
  }
}
