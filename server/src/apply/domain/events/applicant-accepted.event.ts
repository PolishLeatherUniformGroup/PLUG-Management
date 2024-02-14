import { DomainEvent } from 'src/core/domain';

export class ApplicantAccepted implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly decision: string,
  ) {}
}
