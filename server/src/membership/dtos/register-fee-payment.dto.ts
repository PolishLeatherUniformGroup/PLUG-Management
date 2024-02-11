import { MoneyDto } from 'src/apply/dtos/money.dto';

export class RegisterFeePaymentDto {
  memberId: string;
  feeId: string;
  paidAmount: MoneyDto;
  paidDate: Date;
}
