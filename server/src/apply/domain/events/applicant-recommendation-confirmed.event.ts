import { DomainEvent } from '../../../core/domain/models/domain-event';

export class ApplicantRecommendationConfirmed implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly recommendationId: string,
  ) {}
}
