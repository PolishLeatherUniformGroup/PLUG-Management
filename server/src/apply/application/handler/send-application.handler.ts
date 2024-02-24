import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendApplicationCommand } from '../command/send-application.command';
import { APPLICANTS, Applicants } from '../../domain/repository/applicants';
import { Inject } from '@nestjs/common';
import { Applicant, ApplicantId } from 'src/apply/domain/model';
import { randomUUID } from 'crypto';

@CommandHandler(SendApplicationCommand)
export class SendApplicationHandler
  implements ICommandHandler<SendApplicationCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}
  async execute(command: SendApplicationCommand) {
    const applicantId = ApplicantId.fromUUID(randomUUID());
    console.log('applicantId', applicantId.value);
    const applicant = Applicant.register(
      applicantId,
      command.firstName,
      command.lastName,
      command.email,
      command.phoneNumber,
      command.applyDate,
      command.birthDate,
      command.address,
      command.recommendersCards,
    );
    this.applicants.save(applicant);
  }
}
