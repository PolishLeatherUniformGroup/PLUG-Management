import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendApplicationCommand } from '../command/send-application.command';
import { Logger } from '@nestjs/common';
import { Applicant, ApplicantId } from '../../domain/model';
import { randomUUID } from 'crypto';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(SendApplicationCommand)
export class SendApplicationHandler
  implements ICommandHandler<SendApplicationCommand>
{
  private readonly logger = new Logger(SendApplicationHandler.name);

  constructor(private readonly publisher: StoreEventPublisher) {}
  async execute(command: SendApplicationCommand) {
    try {
      const applicantId = ApplicantId.fromUUID(randomUUID());
      this.logger.log(`1. Generated applicationId: ${applicantId.value}`);
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
      this.logger.log(`2. Applicant ${applicantId.value} Created`);
      this.publisher.mergeObjectContext(applicant);
      applicant.commit();
      this.logger.log(`3. Applicant ${applicantId.value} Saved`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
