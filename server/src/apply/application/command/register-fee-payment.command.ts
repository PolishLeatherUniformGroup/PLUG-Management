import { ICommand } from "@nestjs/cqrs";
import { ApplicantId } from "src/apply/domain/model";
import { Money } from "src/shared/money";

export class RegisterFeePaymentCommand  implements ICommand{
    constructor(
        public readonly applicantId: ApplicantId,
        public readonly paymentDate: Date,
        public readonly paidFee: Money
    ){}
}