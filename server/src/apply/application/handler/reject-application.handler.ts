import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { RejectApplicationCommand } from '../command/reject-application.command';

@CommandHandler(RejectApplicationCommand)
export class RejectApplicationHandler
  implements ICommandHandler<RejectApplicationCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: RejectApplicationCommand): Promise<any> {
    try {
      const applicant = await this.applicants.get(command.id);
      if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
      applicant.rejectApplication(
        command.decisionDate,
        command.decision,
        new Date(),
      );
      this.applicants.save(applicant);
    } catch (error) {
      console.trace(error);
    }
  }
}
