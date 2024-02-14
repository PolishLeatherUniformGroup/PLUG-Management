import { EventsHandler, IEvent, IEventHandler } from "@nestjs/cqrs";
import { ApplicantAccepted, ApplicantRejected, ApplicantRejectionAppealAccepted, ApplicantRejectionAppealCancelled, ApplicantRejectionAppealReceived, ApplicantRejectionAppealRejected } from "src/apply/domain/events";
import { ApplicantRecommendationRefused } from "src/apply/domain/events/applicant-recommendation-refused.event";
import { ApplicantRecommendationsRequested } from "src/apply/domain/events/applicant-recommendations-requested.event";
import { ApplicationCancelled } from "src/apply/domain/events/application-cancelled.event";
import { ApplicationReceived } from "src/apply/domain/events/application-received.event";

/**
 * Sends email notifications.
 */
@EventsHandler(ApplicationReceived,
    ApplicantRecommendationsRequested,
    ApplicationCancelled,
    ApplicantRecommendationRefused,
    ApplicantAccepted, ApplicantRejected,
    ApplicantRejectionAppealReceived,
    ApplicantRejectionAppealCancelled,
    ApplicantRejectionAppealAccepted,
    ApplicantRejectionAppealRejected)
export class EmailNotification implements
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
        console.log('Application received:', event);
    }
    async handleRecommendationsRequested(event: ApplicantRecommendationsRequested) {
        console.log('Recommendations requested:', event);
    }
    async handleApplicationCancelled(event: ApplicationCancelled) {
        console.log('Application cancelled:', event);
    }
    async handleApplicationRecommendationRefused(event: ApplicantRecommendationRefused) {
        console.log('Recommendation refused:', event);
    }
    async handleApplicantAccepted(event: ApplicantAccepted) {
        console.log('Application accepted:', event);
    }
    async handleApplicantRejected(event: ApplicantRejected) {
        console.log('Application rejected:', event);
    }
    async handleApplicantRejectionAppealReceived(event: ApplicantRejectionAppealReceived) {
        console.log('Appeal received:', event);
    }
    async handleApplicantRejectionAppealCancelled(event: ApplicantRejectionAppealCancelled) {
        console.log('Appeal cancelled:', event);
    }
    async handleApplicantRejectionAppealAccepted(event: ApplicantRejectionAppealAccepted) {
        console.log('Appeal accepted:', event);
    }
    async handleApplicantRejectionAppealRejected(event: ApplicantRejectionAppealRejected) {
        console.log('Appeal rejected:', event);
    }

}