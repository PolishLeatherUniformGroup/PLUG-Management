import { ICommand } from "@nestjs/cqrs";
import { Money } from "src/shared/money";

export class RequestMembershipFeePaymentCommand implements ICommand{
    constructor(
        public readonly year:number,
        public readonly amount:Money,
        public readonly dueDate:Date
    ){}
}