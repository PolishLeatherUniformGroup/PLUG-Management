import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendApplicationCommand } from '../command/send-application.command';
import { APPLICANTS, Applicants } from '../../domain/repository/applicants';
import { Inject, Logger } from '@nestjs/common';
import { Applicant, ApplicantId } from '../../domain/model';
import { randomUUID } from 'crypto';

@CommandHandler(SendApplicationCommand)
export class SendApplicationHandler
  implements ICommandHandler<SendApplicationCommand>
{
  private readonly logger = new Logger(SendApplicationHandler.name)

  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants
  ) { }
  async execute(command: SendApplicationCommand) {
    try {
      const applicantId = ApplicantId.fromUUID(randomUUID());
      this.logger.log(`Generated applicationId: ${applicantId.value}`);
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
      this.logger.log(`Applicant ${applicantId.value} Created`);
      this.applicants.save(applicant);
      this.logger.log(`Applicant ${applicantId.value} Saved`);
    } catch (error) {
      this.logger.error(error)
    }
  }
}
