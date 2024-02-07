import { MoneyDto } from "./money.dto";

export class RegisterFeePaymnentDto{
    public id:string;
    public fee:MoneyDto;
    public paidDate:Date;
}