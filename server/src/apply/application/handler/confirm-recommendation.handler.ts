import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmRecommendationCommand } from '../command/confirm-recommendation.command';
import { Inject } from '@nestjs/common';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';

@CommandHandler(ConfirmRecommendationCommand)
export class ConfirmRecommendationHandler
  implements ICommandHandler<ConfirmRecommendationCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: ConfirmRecommendationCommand): Promise<any> {
    try {
      const applicant = await this.applicants.get(command.applicantId);
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.confirmRecommendation(command.recommendationId);
      this.applicants.save(applicant);
    } catch (error) {
      console.trace(error);
    }
  }
}
