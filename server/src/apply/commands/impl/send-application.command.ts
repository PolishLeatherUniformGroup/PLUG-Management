import { Address } from "../../model/address.model";

export class SendApplicationCommand{
    constructor(
        public  firstName:string,
        public  lastName:string,
        public  email:string,
        public  phone:string,
        public  birthDate:Date,
        public  address:Address,
        public  recommenders:string[]
    ){}
}
