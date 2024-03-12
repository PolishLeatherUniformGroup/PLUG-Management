import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantRejectionAppealRejected } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

@EventsHandler(ApplicantRejectionAppealRejected)
export class ApplicantRejectionAppealRejectedProjection
  implements IViewUpdater<ApplicantRejectionAppealRejected>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
    private readonly emitter: TypedEventEmitter,
  ) { }

  public async handle(event: ApplicantRejectionAppealRejected): Promise<void> {
    try {
      const application = await this.repository.findOne({
        where: { applicantId: event.id },
      });
      if (!application)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      application.status = ApplicantStatus.AppealRejected;
      application.appealDecision = event.decision;
      application.appealDecisionDate = event.date;
      await this.repository.save(application);
      await this.emitter.emitAsync('apply.application-appeal-rejected', {
        name: application.firstName,
        email: application.email,
        reason: event.decision,
      });
    } catch (error) {
      console.trace(error);
    }
  }
}
