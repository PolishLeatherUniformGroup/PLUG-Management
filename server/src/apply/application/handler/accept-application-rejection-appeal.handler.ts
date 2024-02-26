import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { AcceptApplicationRejectionAppealCommand } from '../command/accept-application-rejection-appeal.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Applicant } from '../../domain/model';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

@CommandHandler(AcceptApplicationRejectionAppealCommand)
export class AcceptApplicationRejectionAppealHandler
  implements ICommandHandler<AcceptApplicationRejectionAppealCommand>
{
  constructor(
    private readonly applicants: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(
    command: AcceptApplicationRejectionAppealCommand,
  ): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.id.value),
      );
      if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
      applicant.acceptApplicationRejectionAppeal(
        command.decisionDate,
        command.decision,
      );
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
