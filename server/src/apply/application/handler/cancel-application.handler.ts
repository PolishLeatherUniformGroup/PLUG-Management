import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelApplicationCommand } from '../command/cancel-application.command';
import { Inject } from '@nestjs/common';
import { APPLICANTS, Applicants } from '../../domain/repository';
import { ApplicantIdNotFound } from '../../domain/exception/applicant-id-not-found.error';
import { Applicant } from '../../domain/model';
import { AggregateRepository } from '../../../eventstore/aggregate-repository';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';

@CommandHandler(CancelApplicationCommand)
export class CancelApplicationHandler
  implements ICommandHandler<CancelApplicationCommand>
{
  constructor(
    private readonly applicants: AggregateRepository,
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
