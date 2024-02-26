import { DomainEvent } from '../../../core/domain';
import { Money } from 'src/shared/money';

export class MembershipFeeRequested implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly year: number,
    public readonly amount: { amount: number; currency: string },
    public readonly dueDate: Date,
  ) {}
}
