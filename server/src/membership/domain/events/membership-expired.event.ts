import { DomainEvent } from '../../../core/domain';

export class MembershipExpired implements DomainEvent {
  constructor(
    public readonly id: string,
    public date: Date,
  ) {}
}
