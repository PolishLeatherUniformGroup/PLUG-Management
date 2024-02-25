import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestRecommendations } from '../command/request-recommendations.command';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { Inject } from '@nestjs/common';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { Applicant } from '../../domain/model';

@CommandHandler(RequestRecommendations)
export class RequestRecommendationsHandler
  implements ICommandHandler<RequestRecommendations>
{
  constructor(@Inject(APPLICANTS) private readonly applicants: Applicants) {}

  async execute(command: RequestRecommendations): Promise<any> {
    try {
      console.log('ApplicantId', command.applicantId.value);
      const applicant: Applicant | null = await this.applicants.get(
        command.applicantId,
      );
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);

      (applicant as Applicant).requestRecommendations(
        command.requestDate,
        command.requiredFee,
        command.recommendersEmails,
        command.recommendersNames,
      );
      this.applicants.save(applicant);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
