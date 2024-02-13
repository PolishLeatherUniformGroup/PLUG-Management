
import { ApplicantPaidFeeProjection } from './applicant-paid-fee.projection';
import { ApplicantRecommendationsRequestedProjection } from './applicant-recommendations-requested.projection';
import { ApplicationCancelledProjection } from './application-cancelled.projection';
import { ApplicationReceivedProjection } from './application-received.projection';

export * from './application-received.projection'
export * from './applicant-recommendations-requested.projection'
export * from './application-cancelled.projection'
export * from './applicant-paid-fee.projection'

export const Projections = [
    ApplicationReceivedProjection,
    ApplicationCancelledProjection,
    ApplicantRecommendationsRequestedProjection,
    ApplicantPaidFeeProjection
];