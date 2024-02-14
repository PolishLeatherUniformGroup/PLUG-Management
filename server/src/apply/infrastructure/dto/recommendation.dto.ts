export class RecommendationDto {
  public id: string;
  public cardNumber: string;
  public requestDate?: Date;
  public isConfirmed: boolean;
  public isRefused: boolean;
}
