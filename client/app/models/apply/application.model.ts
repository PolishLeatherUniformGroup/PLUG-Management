import { Address } from "../address.model";

export class Applicant {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public status: number,
        public applicationDate: Date,
        public birthDate: Date,
        public recommendation1: string,
        public recommendation2: string,
        public requiredFee: number,
        public paidFee?: number,
        public address?: Address,
        public feeCurrency: string = "PLN") { }
}