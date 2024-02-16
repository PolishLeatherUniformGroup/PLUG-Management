import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationCancelled } from 'src/apply/domain/events/application-cancelled.event';
import { Repository } from 'typeorm';
import { ApplicantView } from '../model/applicant.entity';
import { ApplicantStatus } from 'src/apply/domain/model/applicant-status';

@EventsHandler(ApplicationCancelled)
export class ApplicationCancelledProjection
  implements IEventHandler<ApplicationCancelled>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
  ) {}

  async handle(event: ApplicationCancelled) {
    try {
      const applicant = await this.applicantRepository.findOne({
        where: { id: event.id },
      });
      if (applicant) {
        applicant.status = ApplicantStatus.Cancelled;
        await this.applicantRepository.save(applicant);
      }
    } catch (e) {
      console.log('error: ', e);
    }
  }
}
