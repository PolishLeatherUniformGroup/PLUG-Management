import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestRecommendationsCommand } from '../command/request-recommendations.command';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { Inject, Logger } from '@nestjs/common';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { Applicant } from '../../domain/model';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(RequestRecommendationsCommand)
export class RequestRecommendationsHandler
  implements ICommandHandler<RequestRecommendationsCommand>
{
  private readonly logger = new Logger(RequestRecommendationsHandler.name);
  constructor(
    private readonly repository: AggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: RequestRecommendationsCommand): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.repository.getById<Applicant>(
          Applicant,
          command.applicantId.value,
        ),
      );

      if (!applicant) {
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      }
      this.logger.log(`2. Application ${command.applicantId.value} found.`);
      this.logger.log(
        `3. Application has some events: ${applicant.getUncommittedEvents().length}`,
      );

      (applicant as Applicant).requestRecommendations(
        command.requestDate,
        command.requiredFee,
      );
      applicant.commit();
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(error.message);
    }
  }
}
