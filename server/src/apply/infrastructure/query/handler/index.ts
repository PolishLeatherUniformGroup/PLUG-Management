import { GetRecommendationsQuery } from '../get-recommendations.query';
import { GetApplicantRecommendationsHandler } from './get-applicant-recommendations.handler';
import { GetApplicantHandler } from './get-applicant.handler';
import { GetApplicantsHandler } from './get-applicants.handler';
import { GetRecommendationsHandler } from './get-recommendations.handler';

export * from './get-applicant.handler';
export * from './get-applicant-recommendations.handler';
export * from './get-applicants.handler';

export const QueryHandlers = [
  GetApplicantHandler,
  GetApplicantRecommendationsHandler,
  GetApplicantsHandler,
  GetRecommendationsHandler,
];
