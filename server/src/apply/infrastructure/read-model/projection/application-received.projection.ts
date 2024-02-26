import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationReceived } from '../../../domain/events';
import { ApplicantStatus } from '../../../domain/model';
import { ApplicantView } from '../model/applicant.entity';
import { RecommendationView } from '../model/recommendation.entity';
import { Logger } from '@nestjs/common';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';
import { IViewUpdater } from '../../../../eventstore/view/interfaces/view-updater';

@EventsHandler(ApplicationReceived)
export class ApplicationReceivedProjection
  implements IViewUpdater<ApplicationReceived>
{
  private readonly logger = new Logger(ApplicationReceivedProjection.name);
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
    @InjectRepository(RecommendationView)
    private readonly recommendationRepository: Repository<RecommendationView>,
    private readonly emitter: TypedEventEmitter,
  ) {}
  async handle(event: ApplicationReceived) {
    try {
      this.logger.log(`1. Received application ${event.id}`);
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
      this.logger.log(`2. Application view ${event.id} saved`);

      event.recommendations.forEach(async (r) => {
        const rec = new RecommendationView();
        rec.id = r.id;
        rec.cardNumber = r.cardNumber;

        rec.applicant = entity;
        await this.recommendationRepository.save(rec);
        this.logger.log(`3. Recommendation View ${r.id} saved`);

        await this.emitter.emitAsync('apply.application-received', {
          email: event.email,
          name: event.firstName,
        });
      });
      await this.emitter.emitAsync('apply.verify-application', {
        id: event.id,
        rcomendationsCount: event.recommendations.length,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
