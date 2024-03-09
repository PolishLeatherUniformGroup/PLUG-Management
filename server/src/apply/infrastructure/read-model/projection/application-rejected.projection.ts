import { IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantRejected } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

export class ApplicationRejectedProjection
  implements IViewUpdater<ApplicantRejected>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
    private readonly emitter: TypedEventEmitter,
  ) {}

  public async handle(event: ApplicantRejected): Promise<void> {
    const application = await this.repository.findOne({
      where: { applicantId: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.status = ApplicantStatus.Rejected;
    application.decision = event.reason;
    application.decisionDate = event.date;
    application.appealDeadline = event.appealDeadline;
    await this.repository.save(application);
    await this.emitter.emitAsync('apply.application-rejected', {
      name: application.firstName,
      email: application.email,
      reason: event.reason,
      deadline: event.appealDeadline.toDateString(),
    });
  }
}
