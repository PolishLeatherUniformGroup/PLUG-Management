import { DomainEvent } from 'src/core/domain';
import { Money } from 'src/shared/money';

export class MembershipFeeRequested implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly year: number,
    public readonly amount: Money,
    public readonly dueDate: Date,
  ) {}
}
