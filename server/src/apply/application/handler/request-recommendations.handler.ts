import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestRecommendationsCommand } from '../command/request-recommendations.command';
import { Logger } from '@nestjs/common';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { Applicant } from '../../domain/model';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

@CommandHandler(RequestRecommendationsCommand)
export class RequestRecommendationsHandler
  implements ICommandHandler<RequestRecommendationsCommand>
{
  private readonly logger = new Logger(RequestRecommendationsHandler.name);
  constructor(
    private readonly repository: ApplicantAggregateRepository,
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
