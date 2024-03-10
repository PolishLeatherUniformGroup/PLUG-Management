import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantPaidFee } from '../../../domain/events';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId } from '../../../domain/model';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';

@EventsHandler(ApplicantPaidFee)
export class ApplicantPaidFeeProjection
  implements IViewUpdater<ApplicantPaidFee>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
    private readonly emitter: TypedEventEmitter,
  ) {}

  async handle(event: ApplicantPaidFee) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { applicantId: event.id },
      });
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      applicant.paidFeeAmount = event.amount.amount;
      applicant.feePaidDate = event.paidDate;
      this.applicantRepository.save(applicant);
      await this.emitter.emitAsync('apply.payment-received', {
        name: applicant.firstName,
        email: applicant.email,
      });
    } catch (error) {
      console.trace(error);
    }
  }
}
