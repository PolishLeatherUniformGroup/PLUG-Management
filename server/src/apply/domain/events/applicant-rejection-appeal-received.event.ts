import { DomainEvent } from 'src/core/domain';

export class ApplicantRejectionAppealReceived implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
