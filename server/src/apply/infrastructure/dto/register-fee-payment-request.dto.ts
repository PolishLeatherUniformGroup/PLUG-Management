import { MoneyDto } from "./money.dto";

export class RegisterFeePaymentRequestDto{
    public id: string;
    public fee: MoneyDto;
    public paymentDate: Date;
}