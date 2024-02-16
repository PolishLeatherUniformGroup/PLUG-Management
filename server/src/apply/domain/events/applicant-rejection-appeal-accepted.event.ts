import { DomainEvent } from 'src/core/domain';

export class ApplicantRejectionAppealAccepted implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly decision: string,
  ) {}
}
