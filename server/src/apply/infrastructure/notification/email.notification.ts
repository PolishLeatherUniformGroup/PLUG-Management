import { format } from 'date-fns';
import { EventsHandler, IEvent, IEventHandler, QueryBus } from '@nestjs/cqrs';
import {
  ApplicantAccepted,
  ApplicantRejected,
  ApplicantRejectionAppealAccepted,
  ApplicantRejectionAppealCancelled,
  ApplicantRejectionAppealReceived,
  ApplicantRejectionAppealRejected,
} from '../../domain/events';
import { ApplicantRecommendationRefused } from '../../domain/events/applicant-recommendation-refused.event';
import { ApplicantRecommendationsRequested } from '../../domain/events/applicant-recommendations-requested.event';
import { ApplicationCancelled } from '../../domain/events/application-cancelled.event';
import { ApplicationReceived } from '../../domain/events/application-received.event';
import { TypedEventEmitter } from 'src/event-emitter/typed-event-emmitter';
import { GetApplicantQuery } from '../query/get-applicant.query';
import { GetMemberQuery } from 'src/membership/infrastructure/query/get-member.query';
import { ApplicantView } from '../read-model/model/applicant.entity';
import { GetApplicantRecommendationsQuery } from '../query/get-applicant-recommendations.query';
import { RecommendationView } from '../read-model/model/recommendation.entity';
import { MemberView } from 'src/membership/infrastructure/read-model/model/member.entity';

@EventsHandler(
  ApplicationReceived,
  ApplicantRecommendationsRequested,
  ApplicationCancelled,
  ApplicantRecommendationRefused,
  ApplicantAccepted,
  ApplicantRejected,
  ApplicantRejectionAppealReceived,
  ApplicantRejectionAppealCancelled,
  ApplicantRejectionAppealAccepted,
  ApplicantRejectionAppealRejected,
)
export class EmailNotification
  implements
    IEventHandler<ApplicationReceived>,
    IEventHandler<ApplicantRecommendationsRequested>,
    IEventHandler<ApplicationCancelled>,
    IEventHandler<ApplicantRecommendationRefused>,
    IEventHandler<ApplicantAccepted>,
    IEventHandler<ApplicantRejected>,
    IEventHandler<ApplicantRejectionAppealReceived>,
    IEventHandler<ApplicantRejectionAppealCancelled>,
    IEventHandler<ApplicantRejectionAppealAccepted>,
    IEventHandler<ApplicantRejectionAppealRejected>
{
  constructor(
    private readonly emitter: TypedEventEmitter,
    private readonly queryBus: QueryBus,
  ) {}

  async handle(event: IEvent) {
    if (event instanceof ApplicationReceived) {
      this.handleApplicationReceived(event);
    }
    if (event instanceof ApplicantRecommendationsRequested) {
      this.handleRecommendationsRequested(event);
    }
    if (event instanceof ApplicationCancelled) {
      this.handleApplicationCancelled(event);
    }
    if (event instanceof ApplicantRecommendationRefused) {
      this.handleApplicationRecommendationRefused(event);
    }
    if (event instanceof ApplicantAccepted) {
      this.handleApplicantAccepted(event);
    }
    if (event instanceof ApplicantRejected) {
      this.handleApplicantRejected(event);
    }
    if (event instanceof ApplicantRejectionAppealReceived) {
      this.handleApplicantRejectionAppealReceived(event);
    }
    if (event instanceof ApplicantRejectionAppealCancelled) {
      this.handleApplicantRejectionAppealCancelled(event);
    }
    if (event instanceof ApplicantRejectionAppealAccepted) {
      this.handleApplicantRejectionAppealAccepted(event);
    }
    if (event instanceof ApplicantRejectionAppealRejected) {
      this.handleApplicantRejectionAppealRejected(event);
    }
  }

  async handleApplicationReceived(event: ApplicationReceived) {
    console.log('Application received:', event.id);
    await this.emitter.emitAsync('apply.application-received', {
      email: event.email,
      name: event.firstName,
    });
    await this.emitter.emitAsync('apply.verify-application', {
      id: event.id,
      rcomendationsCount: event.recommendations.length,
    });
  }

  async handleRecommendationsRequested(
    event: ApplicantRecommendationsRequested,
  ) {
    const applicantQuery = new GetApplicantQuery(event.id);
    const applicant: ApplicantView =
      await this.queryBus.execute(applicantQuery);
    await this.emitter.emitAsync('apply.request-fee-payment', {
      email: applicant.email,
      name: applicant.firstName,
      feeAmount: event.requiredFee.amount,
      feeCurrency: event.requiredFee.currency,
    });

    const recommendationsQuery = new GetApplicantRecommendationsQuery(
      applicant.id,
    );
    const recommendations: RecommendationView[] =
      await this.queryBus.execute(recommendationsQuery);

    recommendations.forEach(async (recommendation) => {
      const memberQuery = new GetMemberQuery(recommendation.cardNumber);
      const member: MemberView = await this.queryBus.execute(memberQuery);
      await this.emitter.emitAsync('apply.request-recomendation', {
        email: member.email,
        name: member.firstName,
      });
    });
  }

  async handleApplicationCancelled(event: ApplicationCancelled) {
    const query = new GetApplicantQuery(event.id);
    const applicant = await this.queryBus.execute(query);
    await this.emitter.emitAsync('apply.application-cancelled', {
      email: applicant.email,
      name: applicant.firstName,
    });
  }

  async handleApplicationRecommendationRefused(
    event: ApplicantRecommendationRefused,
  ) {
    const query = new GetApplicantQuery(event.id);
    const applicant = await this.queryBus.execute(query);
    await this.emitter.emitAsync('apply.application-not-recommended', {
      email: applicant.email,
      name: applicant.firstName,
    });
  }

  async handleApplicantAccepted(event: ApplicantAccepted) {
    const query = new GetApplicantQuery(event.id);
    const applicant = await this.queryBus.execute(query);
    await this.emitter.emitAsync('apply.application-approved', {
      email: applicant.email,
      name: applicant.firstName,
    });
  }

  async handleApplicantRejected(event: ApplicantRejected) {
    const query = new GetApplicantQuery(event.id);
    const applicant = await this.queryBus.execute(query);

    await this.emitter.emitAsync('apply.application-rejected', {
      email: applicant.email,
      name: applicant.firstName,
      reason: event.reason,
      deadline: format(event.appealDeadline, 'dd-MM-yyyy'),
    });
  }

  async handleApplicantRejectionAppealReceived(
    event: ApplicantRejectionAppealReceived,
  ) {
    console.log('Appeal received:', event);
  }

  async handleApplicantRejectionAppealCancelled(
    event: ApplicantRejectionAppealCancelled,
  ) {
    console.log('Appeal cancelled:', event);
  }

  async handleApplicantRejectionAppealAccepted(
    event: ApplicantRejectionAppealAccepted,
  ) {
    console.log('Appeal accepted:', event);
  }

  async handleApplicantRejectionAppealRejected(
    event: ApplicantRejectionAppealRejected,
  ) {
    console.log('Appeal rejected:', event);
  }
}
