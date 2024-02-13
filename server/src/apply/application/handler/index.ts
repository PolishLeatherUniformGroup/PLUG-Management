import e from 'express';
import { CancelApplicationHandler } from './cancel-application.handler';
import { RegisterFeePaymentHandler } from './register-fee-payment.handler';
import { RequestRecommendationsHandler } from './request-recommendations.handler';
import { SendApplicationHandler } from './send-application.handler';

export * from './send-application.handler';
export * from './request-recommendations.handler';
export * from './cancel-application.handler';
export * from './register-fee-payment.handler';

export const CommandHandlers = [
    SendApplicationHandler,
    RequestRecommendationsHandler,
    CancelApplicationHandler,
    RegisterFeePaymentHandler
];