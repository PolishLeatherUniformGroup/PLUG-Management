import { Address } from 'src/models/address.model';
import { Money } from 'src/models/money.model';

export class ApplicationApprovedEvent {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: Address,
    public readonly paidFee: Money,
    public readonly feePaidDate: Date,
    public readonly birthDate: Date,
    public readonly decisionDate: Date,
  ) {}
}
