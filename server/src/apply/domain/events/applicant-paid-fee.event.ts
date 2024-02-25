import { DomainEvent } from '../../../core/domain/models/domain-event';
import { Money } from '../../../shared/money';


export class ApplicantPaidFee implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly paidDate: Date,
    public readonly amount: Money,
  ) {}
}
