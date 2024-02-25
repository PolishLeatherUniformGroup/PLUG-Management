import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationReceived } from '../../domain/events/application-received.event';
import { ApplicantView } from '../model/applicant.entity';
import { Repository } from 'typeorm';
import { RecommendationView } from '../model/recommendation.entity';
import { ApplicantStatus } from '../../domain/model/applicant-status';

@EventsHandler(ApplicationReceived)
export class ApplicationReceivedProjection
  implements IEventHandler<ApplicationReceived>
{
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
    @InjectRepository(RecommendationView)
    private readonly recommendationRepository: Repository<RecommendationView>,
  ) {}
  async handle(event: ApplicationReceived) {
    try {
      const entity = new ApplicantView();
      entity.id = event.id;
      entity.firstName = event.firstName;
      entity.lastName = event.lastName;
      entity.email = event.email;
      entity.phoneNumber = event.phoneNumber;
      entity.applyDate = event.applyDate;
      entity.birthDate = event.birthDate;
      entity.addressCountry = event.address.country;
      entity.addressCity = event.address.city;
      entity.addressStreet = event.address.street;
      entity.addressPostalCode = event.address.postalCode;
      entity.addressState = event.address.state;
      entity.status = ApplicantStatus.Received;
      await this.applicantRepository.save(entity);

      event.recommendations.forEach((r) => {
        const rec = new RecommendationView();
        rec.id = r.id;
        rec.cardNumber = r.cardNumber.value;

        rec.applicant = entity;
        this.recommendationRepository.save(rec);
      });
    } catch (e) {
      console.log('error: ', e);
    }
  }
}
