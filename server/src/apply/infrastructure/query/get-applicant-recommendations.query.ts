import { IQuery } from "@nestjs/cqrs";

export class GetApplicantRecommendationsQuery implements IQuery{
  constructor(public readonly id: string) {}
}