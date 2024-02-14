import { MoneyDto } from "src/shared/dto/money.dto";

export class RegisterMembershipFeePaymentRequestDto {
    public memberId: string;
    public amount: MoneyDto;
    public paidDate: Date;
}