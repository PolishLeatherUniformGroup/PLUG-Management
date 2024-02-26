import { ICommandHandler } from '@nestjs/cqrs';
import { RegisterFeePaymentCommand } from '../command/register-fee-payment.command';
import { Inject } from '@nestjs/common';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';

export class RegisterFeePaymentHandler
  implements ICommandHandler<RegisterFeePaymentCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: RegisterFeePaymentCommand) {
    try {
      const applicant = await this.applicants.get(command.applicantId);
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.registerFeePayment(command.paidFee, command.paymentDate);
      this.applicants.save(applicant);
    } catch (error) {
      console.trace( error);
    }
  }
}
