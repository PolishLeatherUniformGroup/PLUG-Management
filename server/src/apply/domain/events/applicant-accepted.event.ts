import { DomainEvent } from '../../../core/domain/models/domain-event';

export class ApplicantAccepted implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly decision: string,
  ) {}
}
