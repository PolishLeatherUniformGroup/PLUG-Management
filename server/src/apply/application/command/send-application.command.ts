import { ICommand } from "@nestjs/cqrs";
import { Address } from "src/shared/address";

export class SendApplicationCommand implements ICommand{
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly phoneNumber: string,
        public readonly applyDate: Date,
        public readonly birthDate: Date,
        public readonly address: Address,
        public readonly recommendersCards: string[],
    ) {}
}