import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantRejectionAppealCancelled } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';

@EventsHandler(ApplicantRejectionAppealCancelled)
export class ApplicantRejectionAppealCancelledProjection
  implements IViewUpdater<ApplicantRejectionAppealCancelled>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
  ) {}

  public async handle(event: ApplicantRejectionAppealCancelled): Promise<void> {
    const application = await this.repository.findOne({
      where: { applicantId: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.appealJustification = event.justification;
    application.appealDate = event.appealDate;
    application.status = ApplicantStatus.AppealInvalid;
    await this.repository.save(application);
  }
}
