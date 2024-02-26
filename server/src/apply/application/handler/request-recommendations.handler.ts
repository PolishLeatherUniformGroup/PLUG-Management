import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestRecommendations } from '../command/request-recommendations.command';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { Inject, Logger } from '@nestjs/common';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { Applicant } from '../../domain/model';

@CommandHandler(RequestRecommendations)
export class RequestRecommendationsHandler
  implements ICommandHandler<RequestRecommendations>
{
  private readonly logger = new Logger(RequestRecommendationsHandler.name);
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: RequestRecommendations): Promise<any> {
    try {
      this.logger.log(`Locating application: ${command.applicantId.value}`)
      const applicant: Applicant | null = await this.applicants.get(
        command.applicantId,
      );
      if (!applicant){
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      }
      this.logger.log(`Application ${command.applicantId.value} found.`);

      (applicant as Applicant).requestRecommendations(
        command.requestDate,
        command.requiredFee,
        command.recommendersEmails,
        command.recommendersNames,
      );
      this.applicants.save(applicant);
      this.logger.log(`Recommendations requested for application: ${command.applicantId.value}`);
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(error.message);
    }
  }
}
