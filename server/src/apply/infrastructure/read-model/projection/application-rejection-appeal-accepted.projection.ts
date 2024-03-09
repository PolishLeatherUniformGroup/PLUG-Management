import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantRejectionAppealAccepted } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

@EventsHandler(ApplicantRejectionAppealAccepted)
export class ApplicantRejectionAppealAcceptedProjection
  implements IViewUpdater<ApplicantRejectionAppealAccepted>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
    private readonly emitter: TypedEventEmitter,
  ) {}

  public async handle(event: ApplicantRejectionAppealAccepted): Promise<void> {
    const application = await this.repository.findOne({
      where: { applicantId: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.status = ApplicantStatus.AppealAccepted;
    application.appealDecision = event.decision;
    application.appealDecisionDate = event.date;
    await this.repository.save(application);
    await this.emitter.emitAsync('apply.application-appeal-approved', {
      name: application.firstName,
      email: application.email,
    });
  }
}
