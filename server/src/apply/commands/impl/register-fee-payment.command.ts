import { Money } from "src/models/money.model";

export class RegisterFeePaymentCommand{
    constructor(
        public id:string,
        public feePaid:Money,
        public paidDate:Date
    ){}
}