import { EventsHandler, IEventHandler, QueryBus, IEvent } from "@nestjs/cqrs";
import { format } from "date-fns";
import { GetMemberQuery } from "../../../membership/infrastructure/query/get-member.query";
import { MemberView } from "../../../membership/infrastructure/read-model/model/member.entity";
import { ApplicationReceived, ApplicantRecommendationsRequested, ApplicationCancelled, ApplicantRecommendationRefused, ApplicantAccepted, ApplicantRejected, ApplicantRejectionAppealReceived, ApplicantRejectionAppealCancelled, ApplicantRejectionAppealAccepted, ApplicantRejectionAppealRejected } from "../../domain/events";
import { GetApplicantRecommendationsQuery } from "../query/get-applicant-recommendations.query";
import { GetApplicantQuery } from "../query/get-applicant.query";
import { ApplicantView } from "../read-model/model/applicant.entity";
import { RecommendationView } from "../read-model/model/recommendation.entity";
import { TypedEventEmitter } from "../../../event-emitter/typed-event-emmitter";
import { Logger } from "@nestjs/common";


@EventsHandler(
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
    IEventHandler<ApplicationCancelled>,
    IEventHandler<ApplicantRecommendationRefused>,
    IEventHandler<ApplicantAccepted>,
    IEventHandler<ApplicantRejected>,
    IEventHandler<ApplicantRejectionAppealReceived>,
    IEventHandler<ApplicantRejectionAppealCancelled>,
    IEventHandler<ApplicantRejectionAppealAccepted>,
    IEventHandler<ApplicantRejectionAppealRejected>
{
  private readonly logger = new Logger(EmailNotification.name);
  
  constructor(
    private readonly emitter: TypedEventEmitter,
    private readonly queryBus: QueryBus,
  ) {}

  async handle(event: IEvent) {
    if (event instanceof ApplicationReceived) {
      this.handleApplicationReceived(event);
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
    this.logger.log(`Handling Application received event:'${event.id}`);
   
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
