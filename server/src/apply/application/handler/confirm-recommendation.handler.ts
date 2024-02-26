import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmRecommendationCommand } from '../command/confirm-recommendation.command';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Applicant } from '../../domain/model';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

@CommandHandler(ConfirmRecommendationCommand)
export class ConfirmRecommendationHandler
  implements ICommandHandler<ConfirmRecommendationCommand>
{
  constructor(
    private readonly applicants: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: ConfirmRecommendationCommand): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.applicantId.value),
      );
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.confirmRecommendation(command.recommendationId);
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
