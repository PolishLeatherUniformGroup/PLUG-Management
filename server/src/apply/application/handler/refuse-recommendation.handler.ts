import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { RefuseRecommendationCommand } from '../command/refuse-recommendation.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { Applicant } from '../../domain/model';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(RefuseRecommendationCommand)
export class RefuseRecommendationHandler
  implements ICommandHandler<RefuseRecommendationCommand>
{
  constructor(
    private readonly applicants: AggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: RefuseRecommendationCommand): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.applicantId.value),
      );
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.refuseRecommendation(command.recommendationId);
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
