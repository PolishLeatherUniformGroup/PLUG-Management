import { DomainEvent } from "../../../core/domain";

export class MembershipSuspensionAppealed implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly suspensionId: string,
    public readonly date: Date,
    public readonly justification: string,
  ) {}
}
