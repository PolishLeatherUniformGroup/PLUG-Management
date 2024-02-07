import { Money } from "src/apply/model/money.model";

export class RequestRecommendationCommand {
    constructor(
        public id:string,
        public date:Date,
        public requiredFee?:Money
    ){}
}