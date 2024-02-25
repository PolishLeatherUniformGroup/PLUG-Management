import { DomainEvent } from '../../../core/domain/models/domain-event';

export class ApplicantRejected implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly reason: string,
    public readonly appealDeadline: Date,
  ) {}
}
