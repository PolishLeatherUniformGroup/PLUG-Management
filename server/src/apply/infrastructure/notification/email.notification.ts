import { EventsHandler, IEvent, IEventHandler } from "@nestjs/cqrs";
import { ApplicantRecommendationRefused } from "src/apply/domain/events/applicant-recommendation-refused.event";
import { ApplicantRecommendationsRequested } from "src/apply/domain/events/applicant-recommendations-requested.event";
import { ApplicationCancelled } from "src/apply/domain/events/application-cancelled.event";
import { ApplicationReceived } from "src/apply/domain/events/application-received.event";

/**
 * Sends email notifications.
 */
@EventsHandler(ApplicationReceived, ApplicantRecommendationsRequested, ApplicationCancelled, ApplicantRecommendationRefused)
export class EmailNotification implements IEventHandler<ApplicationReceived>,
    IEventHandler<ApplicantRecommendationsRequested>,
    IEventHandler<ApplicationCancelled>,
    IEventHandler<ApplicantRecommendationRefused> {

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

}