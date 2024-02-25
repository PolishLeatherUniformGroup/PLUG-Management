import { DomainEvent } from "../../../core/domain";

export class MemberExpelled implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly expulsionId: string,
    public readonly date: Date,
    public readonly reason: string,
    public readonly appealDeadline: Date,
  ) {}
}
