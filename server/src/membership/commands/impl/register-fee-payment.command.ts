import { ICommand } from "@nestjs/cqrs";
import { Money } from "src/models/money.model";

export class RegisterFeePaymentCommand  implements ICommand{
    constructor(
        public readonly memberId: string,
        public readonly feeId: string,
        public readonly paidAmount: Money,
        public readonly paymentDate: Date
    ) { }
}