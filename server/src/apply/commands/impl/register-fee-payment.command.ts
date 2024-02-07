import { Money } from "src/apply/model/money.model";

export class RegisterFeePaymentCommand{
    constructor(
        public id:string,
        public feePaid:Money,
        public paidDate:Date
    ){}
}