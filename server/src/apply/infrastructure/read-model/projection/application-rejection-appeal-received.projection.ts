import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../domain/model';
import { ApplicantRejectionAppealReceived } from '../../domain/events/applicant-rejection-appeal-received.event';

@EventsHandler(ApplicantRejectionAppealReceived)
export class ApplicantRejectionAppealReceivedProjection
  implements IEventHandler<ApplicantRejectionAppealReceived>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly repository: Repository<ApplicantView>,
  ) {}

  public async handle(event: ApplicantRejectionAppealReceived): Promise<void> {
    const application = await this.repository.findOne({
      where: { id: event.id },
    });
    if (!application)
      throw ApplicantIdNotFound.withApplicantId(
        ApplicantId.fromString(event.id),
      );
    application.appealJustification = event.justification;
    application.appealDate = event.appealDate;
    application.status = ApplicantStatus.Appealed;
    await this.repository.save(application);
  }
}
