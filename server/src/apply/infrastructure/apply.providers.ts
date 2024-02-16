import { ApplicantEventStore } from './eventstore/applicant.event-store';
import { APPLICANTS } from '../domain/repository/applicants';

export const ApplyProviders = [
  {
    provide: APPLICANTS,
    useClass: ApplicantEventStore,
  },
];
