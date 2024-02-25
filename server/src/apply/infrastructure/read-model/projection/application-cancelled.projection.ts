import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationCancelled } from '../../../domain/events';
import { ApplicantStatus } from '../../../domain/model';
import { ApplicantView } from '../model/applicant.entity';

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
