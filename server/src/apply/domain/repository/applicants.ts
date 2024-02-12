import { Applicant, ApplicantId } from "../model";

export interface Applicants{
    get(id:ApplicantId): Promise<Applicant|null>
    save(applicant:Applicant): void
}

export const APPLICANTS ='APPLICANTS';