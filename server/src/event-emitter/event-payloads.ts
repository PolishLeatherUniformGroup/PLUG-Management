export interface EventPayloads {
  'apply.application-received': { name: string; email: string };
  'apply.request-recomendation': { name: string; email: string };
  'apply.application-cancelled': { name: string; email: string };
  'apply.request-fee-payment': {
    name: string;
    email: string;
    feeAmount: number;
    feeCurrency: string;
  };
  'apply.application-not-recommended': { name: string; email: string };
  'apply.application-approved': { name: string; email: string };
  'apply.application-rejected': {
    name: string;
    email: string;
    reason: string;
    deadline: string;
  };
  'apply.verify-application': { id: string; rcomendationsCount: number };
  'apply.payment-received': { name: string, email: string };
  'apply.application-appealed': { name: string, email: string };
  'apply.application-appeal-rejected': { name: string, email: string, reason: string };
  'apply.application-appeal-approved': { name: string, email: string };
  'apply.application-appeal-cancelled': { name: string, email: string };
}
