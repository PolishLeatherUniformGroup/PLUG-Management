import { Address } from 'src/shared/address';
import { ApplicantAccepted } from './applicant-accepted.event';
import { ApplicantPaidFee } from './applicant-paid-fee.event';
import { ApplicantRecommendationConfirmed } from './applicant-recommendation-confirmed.event';
import { ApplicantRecommendationRefused } from './applicant-recommendation-refused.event';
import { ApplicantRecommendationsRequested } from './applicant-recommendations-requested.event';
import { ApplicantRecommended } from './applicant-recommended.event';
import { ApplicantRejected } from './applicant-rejected.event';
import { ApplicantRejectionAppealAccepted } from './applicant-rejection-appeal-accepted.event';
import { ApplicantRejectionAppealCancelled } from './applicant-rejection-appeal-cancelled.event';
import { ApplicantRejectionAppealRejected } from './applicant-rejection-appeal-rejected.event';
import { ApplicationCancelled } from './application-cancelled.event';
import { ApplicationNotRecommended } from './application-not-recommended.event';
import { ApplicationReceived } from './application-received.event';
import { Recommendation } from '../model/recommendation';
import { Money } from 'src/shared/money';
import { ApplicantRejectionAppealReceived } from './applicant-rejection-appeal-received.event';

export * from './applicant-recommendations-requested.event';
export * from './applicant-recommendation-refused.event';
export * from './applicant-recommendation-confirmed.event';
export * from './application-cancelled.event';
export * from './application-received.event';
export * from './applicant-accepted.event';
export * from './applicant-rejected.event';
export * from './applicant-paid-fee.event';
export * from './application-not-recommended.event';
export * from './applicant-rejection-appeal-received.event';
export * from './applicant-rejection-appeal-cancelled.event';
export * from './applicant-rejection-appeal-accepted.event';
export * from './applicant-rejection-appeal-rejected.event';
export * from './applicant-recommended.event';

export {
  ApplicationReceived,
  ApplicantAccepted,
  ApplicantPaidFee,
  ApplicantRecommendationConfirmed,
  ApplicantRecommendationRefused,
  ApplicantRecommendationsRequested,
  ApplicantRecommended,
  ApplicantRejected,
  ApplicantRejectionAppealAccepted,
  ApplicantRejectionAppealCancelled,
  ApplicantRejectionAppealRejected,
  ApplicationCancelled,
  ApplicationNotRecommended,
};
export const ApplyEvents = {
  ApplicationReceived: (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    applyDate: Date,
    birthDate: Date,
    address: Address,
    recommendations: { id: string; cardNumber: string }[],
  ) =>
    new ApplicationReceived(
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      applyDate,
      birthDate,
      address,
      recommendations,
    ),
  ApplicantRecommendationsRequested: (
    id: string,
    requestedDate: Date,
    requiredFee: { amount: number; currency: string },
  ) => new ApplicantRecommendationsRequested(id, requestedDate, requiredFee),
  ApplicationCancelled: (id: string) => new ApplicationCancelled(id),
  ApplicantPaidFee: (
    id: string,
    paymentDate: Date,
    fee: { amount: number; currency: string },
  ) => new ApplicantPaidFee(id, paymentDate, fee),
  ApplicantRecommendationConfirmed: (id: string, recommendationId: string) =>
    new ApplicantRecommendationConfirmed(id, recommendationId),
  ApplicantRecommendationRefused: (id: string, recommendationId: string) =>
    new ApplicantRecommendationRefused(id, recommendationId),
  ApplicantAccepted: (id: string, date: Date, decision: string) =>
    new ApplicantAccepted(id, date, decision),
  ApplicantRejected: (
    id: string,
    date: Date,
    decision: string,
    appealDeadline: Date,
  ) => new ApplicantRejected(id, date, decision, appealDeadline),
  ApplicationNotRecommended: (id: string) => new ApplicationNotRecommended(id),
  ApplicantRecommended: (id: string) => new ApplicantRecommended(id),
  ApplicantRejectionAppealReceived: (
    id: string,
    appelaDate: Date,
    justification: string,
  ) => new ApplicantRejectionAppealReceived(id, appelaDate, justification),
  ApplicantRejectionAppealCancelled: (
    id: string,
    appelaDate: Date,
    justification: string,
  ) => new ApplicantRejectionAppealCancelled(id, appelaDate, justification),
  ApplicantRejectionAppealAccepted: (
    id: string,
    decisionDate: Date,
    decision: string,
  ) => new ApplicantRejectionAppealAccepted(id, decisionDate, decision),
  ApplicantRejectionAppealRejected: (
    id: string,
    decisionDate: Date,
    decision: string,
  ) => new ApplicantRejectionAppealRejected(id, decisionDate, decision),
};
