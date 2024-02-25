import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantRejectionAppealAccepted } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';

@EventsHandler(ApplicantRejectionAppealAccepted)
export class ApplicantRejectionAppealAcceptedProjection
  implements IEventHandler<ApplicantRejectionAppealAccepted>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
  ) {}

  public async handle(event: ApplicantRejectionAppealAccepted): Promise<void> {
    const application = await this.repository.findOne({
      where: { id: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.status = ApplicantStatus.AppealAccepted;
    application.appealDecision = event.decision;
    application.appealDecisionDate = event.date;
    await this.repository.save(application);
  }
}
