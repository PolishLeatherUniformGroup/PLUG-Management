import { MoneyDto } from "../../../shared/dto/money.dto";

export class RequestMembershipFeePaymentDto {
  public amount: MoneyDto;
  public year: number;
  public dueDate: Date;
}
