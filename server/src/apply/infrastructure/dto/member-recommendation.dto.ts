export class MemberRecommendationDto {
  recommendationId: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  applyDate: Date;
  status?: boolean;
}