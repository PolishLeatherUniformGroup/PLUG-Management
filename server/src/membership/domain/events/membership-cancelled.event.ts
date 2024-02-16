import { DomainEvent } from 'src/core/domain';

export class MembershipCancelled implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly date: Date,
  ) {}
}
