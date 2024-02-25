import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { RefuseRecommendationCommand } from '../command/refuse-recommendation.command';

@CommandHandler(RefuseRecommendationCommand)
export class RefuseRecommendationHandler
  implements ICommandHandler<RefuseRecommendationCommand>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: RefuseRecommendationCommand): Promise<any> {
    try {
      const applicant = await this.applicants.get(command.applicantId);
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.refuseRecommendation(command.recommendationId);
      this.applicants.save(applicant);
    } catch (error) {
      console.log(error);
    }
  }
}
