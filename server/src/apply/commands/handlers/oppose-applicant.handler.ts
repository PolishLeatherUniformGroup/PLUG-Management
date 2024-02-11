import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ApplicantRepository } from 'src/apply/repository/applicant.repository';
import { OpposeApplicantCommand } from '../impl/oppose-applicant.command';

@CommandHandler(OpposeApplicantCommand)
export class OpposeApplicantHandler
  implements ICommandHandler<OpposeApplicantCommand>
{
  constructor(
    private readonly repository: ApplicantRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: OpposeApplicantCommand): Promise<any> {
    const applicant = this.eventPublisher.mergeObjectContext(
      await this.repository.get(command.id),
    );

    applicant.opposeRecommendation(command.recommenderId);
    this.repository.save(applicant);
    applicant.commit();
  }
}
