import { DomainEvent } from "../../../core/domain";

export class MemberSuspended implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly suspensionId: string,
    public readonly date: Date,
    public readonly reason: string,
    public readonly suspensionEndDate: Date,
    public readonly appealDeadline: Date,
  ) {}
}
