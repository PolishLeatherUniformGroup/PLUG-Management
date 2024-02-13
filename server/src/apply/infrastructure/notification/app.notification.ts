import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ApplicantRecommendationsRequested } from "src/apply/domain/events/applicant-recommendations-requested.event";

/**
 * Sends in app notifications.
 */
@EventsHandler(ApplicantRecommendationsRequested)
export class AppNotification  implements IEventHandler<ApplicantRecommendationsRequested>{
    handle(event: ApplicantRecommendationsRequested) {
        throw new Error("Method not implemented.");
    }
    
}