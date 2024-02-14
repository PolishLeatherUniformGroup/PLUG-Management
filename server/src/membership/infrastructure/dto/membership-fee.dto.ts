import { MoneyDto } from "src/shared/dto/money.dto";

export class MembershipFeeDto {
    id?: string;
    year: number;
    dueAmount: MoneyDto;
    dueDate: Date;
    paidAmount?: MoneyDto;
    paidDate?: Date;

}