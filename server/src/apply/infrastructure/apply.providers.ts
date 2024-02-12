import { ApplicantEventStore } from "./eventstore/applicant.event-store";
import { APPLICANTS } from '../domain/repository/applicants';
import { DataSource } from "typeorm";
import { ApplicantView } from "./read-model/model/applicant.entity";

export const ApplyProviders =[
    {
        provide : APPLICANTS,
        useClass: ApplicantEventStore
    }
]