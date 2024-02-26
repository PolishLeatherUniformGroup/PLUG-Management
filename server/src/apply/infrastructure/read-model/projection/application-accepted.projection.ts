import { IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantAccepted } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';

export class ApplicationAcceptedProjection
  implements IViewUpdater<ApplicantAccepted>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
  ) {}

  public async handle(event: ApplicantAccepted): Promise<void> {
    const application = await this.repository.findOne({
      where: { applicantId: event.id },
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
