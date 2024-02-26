import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { AcceptApplicationCommand } from '../command/accept-application.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Applicant } from '../../domain/model';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

@CommandHandler(AcceptApplicationCommand)
export class AcceptApplicationHandler
  implements ICommandHandler<AcceptApplicationCommand>
{
  constructor(
    private readonly applicants: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: AcceptApplicationCommand): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.id.value),
      );
      if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
      applicant.acceptApplication(command.decisionDate, command.decision);
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
