import { DomainEvent } from 'src/core/domain';

export class MembershipSuspensionAppealAccepted implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly suspensionId: string,
    public readonly date: Date,
    public readonly reason: string,
  ) {}
}
