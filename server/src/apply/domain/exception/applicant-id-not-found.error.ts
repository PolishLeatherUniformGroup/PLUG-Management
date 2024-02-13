import { ApplicantId } from "../model";

export class ApplicantIdNotFound extends Error {
    static withApplicantId(applicantId: ApplicantId): ApplicantIdNotFound {
        return new ApplicantIdNotFound(`Applicant with id ${applicantId.value} cannot be found`);
    }
  
}