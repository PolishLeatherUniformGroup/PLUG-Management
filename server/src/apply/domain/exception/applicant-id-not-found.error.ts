import { ApplicantId } from '../model';

export class ApplicantIdNotFound extends Error {
  static withApplicantId(applicantId: ApplicantId): ApplicantIdNotFound {
    return new ApplicantIdNotFound(
      `Applicant with id ${applicantId.value} cannot be found`,
    );
  }
}
export class RecommendationIdNotFound extends Error {
  static withApplicantIdAndRecommendationId(
    applicantId: ApplicantId,
    recommendationId: string,
  ): ApplicantIdNotFound {
    return new RecommendationIdNotFound(
      `Recommendation with id ${recommendationId} of Applicant with id ${applicantId.value} cannot be found`,
    );
  }
}
