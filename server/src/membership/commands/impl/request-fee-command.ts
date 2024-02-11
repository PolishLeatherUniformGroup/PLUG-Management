import { ICommand } from '@nestjs/cqrs';
import { Money } from 'src/models/money.model';

export class RequestFeeCommand implements ICommand {
  constructor(
    public readonly year: number,
    public readonly feeAmount: Money,
    public readonly feeDueDate: Date,
  ) {}
}
