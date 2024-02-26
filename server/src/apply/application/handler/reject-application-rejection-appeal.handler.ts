import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { RejectApplicationRejectionAppealCommand } from '../command/reject-application-rejection-appeal.command';

@CommandHandler(RejectApplicationRejectionAppealCommand)
export class RejectApplicationRejectionAppealHandler
  implements ICommandHandler<RejectApplicationRejectionAppealCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(
    command: RejectApplicationRejectionAppealCommand,
  ): Promise<any> {
    try {
      const applicant = await this.applicants.get(command.id);
      if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
      applicant.rejectApplicationRejectionAppeal(
        command.decisionDate,
        command.decision,
      );
      this.applicants.save(applicant);
    } catch (error) {
      console.trace(error);
    }
  }
}
