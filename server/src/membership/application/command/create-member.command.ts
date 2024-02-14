import { ICommand } from "@nestjs/cqrs";
import { MemberId } from "src/membership/domain/model/member-id";
import { MembershipFee } from "src/membership/domain/model/membership-fee";
import { Address } from "src/shared/address";

export class CreateMemberCommand implements ICommand{
    constructor(
        public readonly memberId: MemberId,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly phoneNumber: string,
        public readonly joinDate: Date,
        public readonly birthDate: Date,
        public readonly address: Address,
        public readonly initialFee: MembershipFee
    ){}
}