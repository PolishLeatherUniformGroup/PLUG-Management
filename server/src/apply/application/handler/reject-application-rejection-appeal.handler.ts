import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { RejectApplicationRejectionAppealCommand } from '../command/reject-application-rejection-appeal.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Applicant } from '../../domain/model';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

@CommandHandler(RejectApplicationRejectionAppealCommand)
export class RejectApplicationRejectionAppealHandler
  implements ICommandHandler<RejectApplicationRejectionAppealCommand>
{
  constructor(
    private readonly applicants: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(
    command: RejectApplicationRejectionAppealCommand,
  ): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.id.value),
      );
      if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
      applicant.rejectApplicationRejectionAppeal(
        command.decisionDate,
        command.decision,
      );
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
