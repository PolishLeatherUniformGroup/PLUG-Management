import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { AcceptApplicationCommand } from '../command/accept-application.command';

@CommandHandler(AcceptApplicationCommand)
export class AcceptApplicationHandler
  implements ICommandHandler<AcceptApplicationCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: AcceptApplicationCommand): Promise<any> {
    try {
      const applicant = await this.applicants.get(command.id);
      if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
      applicant.acceptApplication(command.decisionDate, command.decision);
      this.applicants.save(applicant);
    } catch (error) {
      console.log(error);
    }
  }
}
