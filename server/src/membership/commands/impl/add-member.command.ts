import { ICommand } from '@nestjs/cqrs';
import { Address } from 'src/models/address.model';
import { Money } from 'src/models/money.model';

export class AddMemberCommand implements ICommand {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public address: Address,
    public birthDate: Date,
    public joinDate: Date,
    public paidFeeAmount: Money,
    public paidFeeDate: Date,
  ) {}
}
