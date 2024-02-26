import { MoneyDto } from '../../../shared/dto/money.dto';

export class RegisterMembershipFeePaymentRequestDto {
  public memberId: string;
  public amount: MoneyDto;
  public paidDate: Date;
}
