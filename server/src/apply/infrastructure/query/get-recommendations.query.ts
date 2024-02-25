import { IQuery } from "@nestjs/cqrs";

export class GetRecommendationsQuery implements IQuery {
  constructor(public readonly id: string) {}
}