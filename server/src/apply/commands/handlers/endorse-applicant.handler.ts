import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EndorseApplicantCommand } from '../impl/endorse-applicant.command';
import { ApplicantRepository } from 'src/apply/repository/applicant.repository';
import { OpposeApplicantCommand } from '../impl/oppose-applicant.command';

@CommandHandler(EndorseApplicantCommand)
export class EndorseApplicantHandler
  implements ICommandHandler<EndorseApplicantCommand>
{
  constructor(
    private readonly repository: ApplicantRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: EndorseApplicantCommand): Promise<any> {
    const applicant = this.eventPublisher.mergeObjectContext(
      await this.repository.get(command.id),
    );

    applicant.endorseRecommendation(command.recommenderId);
    this.repository.save(applicant);
    applicant.commit();
  }
}
