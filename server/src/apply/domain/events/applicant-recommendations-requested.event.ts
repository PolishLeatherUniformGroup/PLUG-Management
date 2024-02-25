import { DomainEvent } from '../../../core/domain/models/domain-event';
import { Money } from '../../../shared/money';


export class ApplicantRecommendationsRequested implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly requestDate: Date,
    public readonly requiredFee: Money,
  ) {}
}
