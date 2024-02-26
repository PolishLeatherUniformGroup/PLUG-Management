import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { RejectApplicationCommand } from '../command/reject-application.command';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Applicant } from '../../domain/model';
import { ApplicantAggregateRepository } from '../../infrastructure/repository/applicant-aggregate-repository';

@CommandHandler(RejectApplicationCommand)
export class RejectApplicationHandler
  implements ICommandHandler<RejectApplicationCommand>
{
  constructor(
    private readonly applicants: ApplicantAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: RejectApplicationCommand): Promise<any> {
    try {
      const applicant = this.publisher.mergeObjectContext(
        await this.applicants.getById(Applicant, command.id.value),
      );
      if (!applicant) throw ApplicantIdNotFound.withApplicantId(command.id);
      applicant.rejectApplication(
        command.decisionDate,
        command.decision,
        new Date(),
      );
      applicant.commit();
    } catch (error) {
      console.trace(error);
    }
  }
}
