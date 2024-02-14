export class ConfirmRecommendationRequestDto {
  constructor(
    public readonly id: string,
    public readonly recommendationId: string,
  ) {}
}
