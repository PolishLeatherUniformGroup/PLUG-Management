import { ICommandHandler } from '@nestjs/cqrs';
import { RegisterFeePaymentCommand } from '../command/register-fee-payment.command';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Applicant } from '../../domain/model';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

export class RegisterFeePaymentHandler
  implements ICommandHandler<RegisterFeePaymentCommand>
{
  constructor(
    private readonly applicants: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: RegisterFeePaymentCommand) {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.applicantId.value),
      );
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.registerFeePayment(command.paidFee, command.paymentDate);
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
