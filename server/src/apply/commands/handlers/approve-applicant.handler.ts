import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ApproveApplicantCommand } from '../impl/approve-applicant.command';
import { ApplicantRepository } from 'src/apply/repository/applicant.repository';

@CommandHandler(ApproveApplicantCommand)
export class ApproveApplicantHandler
  implements ICommandHandler<ApproveApplicantCommand>
{
  constructor(
    private readonly repository: ApplicantRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: ApproveApplicantCommand): Promise<any> {
    const applicant = this.eventPublisher.mergeObjectContext(
      await this.repository.get(command.id),
    );

    applicant.approve(command.date);
    await this.repository.save(applicant);
    applicant.commit();
  }
}
