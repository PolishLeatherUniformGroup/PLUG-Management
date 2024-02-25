import { DomainEvent } from '../../../core/domain/models/domain-event';

export class ApplicantRejectionAppealRejected implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly decision: string,
  ) {}
}
