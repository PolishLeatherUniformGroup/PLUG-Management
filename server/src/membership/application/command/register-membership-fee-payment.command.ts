import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';
import { Money } from '../../../shared/money';

export class RegisterMembershipFeePaymentCommand implements ICommand {
  constructor(
    public readonly memberId: MemberId,
    public readonly feeId: string,
    public readonly amount: Money,
    public readonly paidDate: Date,
  ) {}
}
