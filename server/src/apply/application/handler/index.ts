import { CancelApplicationHandler } from './cancel-application.handler';
import { RegisterFeePaymentHandler } from './register-fee-payment.handler';
import { RequestRecommendationsHandler } from './request-recommendations.handler';
import { SendApplicationHandler } from './send-application.handler';
import { ConfirmRecommendationHandler } from './confirm-recommendation.handler';
import { RefuseRecommendationHandler } from './refuse-recommendation.handler';
import { AcceptApplicationHandler } from './accept-application.handler';
import { RejectApplicationHandler } from './reject-application.handler';
import { AppealApplicationRejectionHandler } from './appeal-application-rejection.handler';

export * from './send-application.handler';
export * from './request-recommendations.handler';
export * from './cancel-application.handler';
export * from './register-fee-payment.handler';
export * from './confirm-recommendation.handler';
export * from './refuse-recommendation.handler';
export * from './accept-application.handler';
export * from './reject-application.handler';
export * from './appeal-application-rejection.handler';

export const CommandHandlers = [
  SendApplicationHandler,
  RequestRecommendationsHandler,
  CancelApplicationHandler,
  RegisterFeePaymentHandler,
  ConfirmRecommendationHandler,
  RefuseRecommendationHandler,
  AcceptApplicationHandler,
  RejectApplicationHandler,
  AppealApplicationRejectionHandler,
];
