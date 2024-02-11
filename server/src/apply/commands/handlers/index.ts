import { DismissApplicationHandler } from './dismiss-application.handler';
import { EndorseApplicantHandler } from './endorse-applicant.handler';
import { OpposeApplicantHandler } from './oppose-applicant.handler';
import { RequestRecommendationHandler } from './request-recommendation.handler';
import { SendApplicationHandler } from './send-application.handler';

export const CommandHandlers = [
  SendApplicationHandler,
  DismissApplicationHandler,
  RequestRecommendationHandler,
  EndorseApplicantHandler,
  OpposeApplicantHandler,
];
