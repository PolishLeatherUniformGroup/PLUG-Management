import { DomainEvent } from 'src/core/domain';
import { Money } from 'src/shared/money';

export class ApplicantRecommendationsRequested implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly email: string,
    public readonly requestDate: Date,
    public readonly requiredFee: Money,
    public readonly recommendations: { email: string; name: string }[],
  ) {}
}
