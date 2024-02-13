import { EventsHandler, IEvent, IEventHandler } from "@nestjs/cqrs";
import { ApplicantRecommendationsRequested } from "src/apply/domain/events/applicant-recommendations-requested.event";
import { ApplicationCancelled } from "src/apply/domain/events/application-cancelled.event";
import { ApplicationReceived } from "src/apply/domain/events/application-received.event";

/**
 * Sends email notifications.
 */
@EventsHandler(ApplicationReceived, ApplicantRecommendationsRequested, ApplicationCancelled)
export class EmailNotification implements IEventHandler<ApplicationReceived>,
    IEventHandler<ApplicantRecommendationsRequested>,
    IEventHandler<ApplicationCancelled> {

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
    }

    async handleApplicationReceived(event: ApplicationReceived) {
        throw new Error("Method not implemented.");
    }
    async handleRecommendationsRequested(event: ApplicantRecommendationsRequested) {
        throw new Error("Method not implemented.");
    }
    async handleApplicationCancelled(event: ApplicationCancelled) {
        throw new Error("Method not implemented.");
    }

}