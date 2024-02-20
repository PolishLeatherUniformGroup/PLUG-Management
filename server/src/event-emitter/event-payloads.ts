export interface EventPayloads {
    'apply.application-received': { name: string; email: string };
    'apply.request-recomendation': { name: string; email: string };
    'apply.application-cancelled': { name: string; email: string };
    'apply.request-fee-payment': { name: string; email: string; feeAmount: number, feeCurrency: string };
    'apply.application-not-recommended': { name: string; email: string };
  }