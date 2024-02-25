import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicantRecommendationsRequested } from '../../domain/events/applicant-recommendations-requested.event';

/**
 * Sends in app notifications.
 */
@EventsHandler(ApplicantRecommendationsRequested)
export class AppNotification
  implements IEventHandler<ApplicantRecommendationsRequested>
{
  handle(event: ApplicantRecommendationsRequested) {
    console.log('Recommendations requested:', event);
  }
}
