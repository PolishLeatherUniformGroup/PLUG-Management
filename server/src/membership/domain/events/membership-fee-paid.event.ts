import { DomainEvent } from "../../../core/domain";
import { Money } from 'src/shared/money';

export class MembershipFeePaid implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly feeId: string,
    public readonly amount: Money,
    public readonly paidDate: Date,
  ) {}
}
