import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantRecommendationsRequested } from '../../../domain/events';
import { ApplicantIdNotFound } from '../../../domain/exception/applicant-id-not-found.error';
import { ApplicantId, ApplicantStatus } from '../../../domain/model';
import { ApplicantView } from '../model/applicant.entity';
import { RecommendationView } from '../model/recommendation.entity';
import { Logger } from '@nestjs/common';
import { TypedEventEmitter } from '../../../../event-emitter/typed-event-emmitter';
import { MemberView } from '../../../../membership/infrastructure/read-model/model/member.entity';


@EventsHandler(ApplicantRecommendationsRequested)
export class ApplicantRecommendationsRequestedProjection
  implements IEventHandler<ApplicantRecommendationsRequested>
{
  private readonly logger = new Logger(ApplicantRecommendationsRequestedProjection.name);
  constructor(
    @InjectRepository(ApplicantView)
    private readonly applicantRepository: Repository<ApplicantView>,
    @InjectRepository(RecommendationView)
    private readonly recommendationRepository: Repository<RecommendationView>,
    private readonly emitter: TypedEventEmitter,
    @InjectRepository(MemberView)
    private readonly memberRepository: Repository<MemberView>,
  ) { }

  async handle(event: ApplicantRecommendationsRequested) {
    try {
      this.logger.log(`Handling event: ${event.constructor.name}`);
      this.logger.log(`Locating Applicant for update: ${event.id}`);
      const applicant = await this.applicantRepository.findOne({
        where: { id: event.id },
      });

      if (!applicant)
        throw ApplicantIdNotFound.withApplicantId(
          ApplicantId.fromString(event.id),
        );
      this.logger.log(`Applicant ${event.id} found.`);
      applicant.status = ApplicantStatus.InRecommendation;
      applicant.requiredFeeAmount = event.requiredFee.amount;
      applicant.feeCurrency = event.requiredFee.currency;

      this.logger.log(`Updating recommendations for applicant: ${event.id}`);
      const recommendations = await this.recommendationRepository.find({
        where: { applicant: { id: event.id } },
      });
      recommendations.forEach((r) => {
        this.logger.log(`Updating recommendation: ${r.id}`);
        r.requestDate = event.requestDate;
        this.recommendationRepository.save(r);
        this.logger.log(`Recommendation ${r.id} updated`);
      });
      this.applicantRepository.save(applicant);
      this.logger.log(`Applicant ${event.id} updated`);

      await this.emitter.emitAsync('apply.request-fee-payment', {
        email: applicant.email,
        name: applicant.firstName,
        feeAmount: event.requiredFee.amount,
        feeCurrency: event.requiredFee.currency,
      });

      recommendations.forEach(async (r) => {
        const member = await this.memberRepository.findOne({ where: { cardNumber: r.cardNumber } });
        if (member) {
          await this.emitter.emitAsync('apply.request-recomendation', {
            email: member.email,
            name: member.firstName,
          });
        }
      });

    } catch (error) {
      this.logger.error(`Error handling event: ${event.constructor.name}`);
    }
  }
}
