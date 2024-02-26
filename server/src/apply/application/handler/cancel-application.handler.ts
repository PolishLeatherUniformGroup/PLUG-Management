import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelApplicationCommand } from '../command/cancel-application.command';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { Applicant } from '../../domain/model';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

@CommandHandler(CancelApplicationCommand)
export class CancelApplicationHandler
  implements ICommandHandler<CancelApplicationCommand>
{
  constructor(
    private readonly applicants: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: CancelApplicationCommand): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.applicantId.value),
      );
      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(command.applicantId);
      applicant.cancelApplication();
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
