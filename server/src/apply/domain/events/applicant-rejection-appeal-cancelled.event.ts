import { DomainEvent } from '../../../core/domain/models/domain-event';

export class ApplicantRejectionAppealCancelled implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
