import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantRejectionAppealReceived } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

@EventsHandler(ApplicantRejectionAppealReceived)
export class ApplicantRejectionAppealReceivedProjection
  implements IViewUpdater<ApplicantRejectionAppealReceived>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
    private readonly emitter: TypedEventEmitter,
  ) {}

  public async handle(event: ApplicantRejectionAppealReceived): Promise<void> {
    const application = await this.repository.findOne({
      where: { applicantId: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.appealJustification = event.justification;
    application.appealDate = event.appealDate;
    application.status = ApplicantStatus.Appealed;
    await this.repository.save(application);
    await this.emitter.emitAsync('apply.application-appealed', {
      name: application.firstName,
      email: application.email,
    });
  }
}
