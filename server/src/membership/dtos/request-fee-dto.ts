import { MoneyDto } from 'src/apply/dtos/money.dto';

export class RequestFeeDto {
  year: number;
  feeAmount: MoneyDto;
  feeDueDate: Date;
}
