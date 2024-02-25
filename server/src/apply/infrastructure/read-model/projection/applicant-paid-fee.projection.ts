import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantPaidFee } from '../../domain/events/applicant-paid-fee.event';
import { Repository } from 'typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { ApplicantId } from '../../domain/model';

@EventsHandler(ApplicantPaidFee)
export class ApplicantPaidFeeProjection
  implements IEventHandler<ApplicantPaidFee>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
  ) {}

  async handle(event: ApplicantPaidFee) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { id: event.id },
      });
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      applicant.paidFeeAmount = event.amount.amount;
      applicant.feePaidDate = event.paidDate;
      this.applicantRepository.save(applicant);
    } catch (e) {
      console.log('error: ', e);
    }
  }
}
