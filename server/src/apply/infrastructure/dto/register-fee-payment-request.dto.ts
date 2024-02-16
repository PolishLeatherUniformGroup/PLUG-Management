import { MoneyDto } from '../../../shared/dto/money.dto';

export class RegisterFeePaymentRequestDto {
  public id: string;
  public fee: MoneyDto;
  public paymentDate: Date;
}
