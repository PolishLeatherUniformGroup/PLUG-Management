import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelApplicationCommand } from '../command/cancel-application.command';
import { Inject } from '@nestjs/common';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';

@CommandHandler(CancelApplicationCommand)
export class CancelApplicationHandler
  implements ICommandHandler<CancelApplicationCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: CancelApplicationCommand): Promise<any> {
    try {
      const applicant = await this.applicants.get(command.applicantId);
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.cancelApplication();
      this.applicants.save(applicant);
    } catch (error) {
      console.log(error);
    }
  }
}
