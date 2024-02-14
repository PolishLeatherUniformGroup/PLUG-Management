import { AggregateRoot } from "src/core/domain";
import { Address } from "src/shared/address";
import { MemberId } from "./member-id";
import { MembershipFee } from "./membership-fee";
import { MemberStatus } from "./member-status";
import { MemberCreated } from "../events/member-created.event";

export class Member extends AggregateRoot{
    private _memberId: MemberId;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phoneNumber: string;
    private _joinDate: Date;
    private _birthDate: Date;
    private _address: Address;
    private _membershipFees: MembershipFee[];
    private _status:MemberStatus;

    constructor(){
        super();
    }
    
    public aggregateId(): string {
        return this._memberId.value;
    }

    public static create(memberId: MemberId,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        joinDate: Date,
        birthDate: Date,
        address: Address,
        initialFee:MembershipFee ): Member {
        const member = new Member();
        member.apply(new MemberCreated(memberId.value, firstName, lastName, email, phoneNumber, joinDate, birthDate, address, initialFee));
        return member;
    }

    private onMemberCreated(event: MemberCreated){
        this._memberId = MemberId.fromString(event.id);
        this._firstName = event.firstName;
        this._lastName = event.lastName;
        this._email = event.email;
        this._phoneNumber = event.phoneNumber;
        this._joinDate = event.joinDate;
        this._birthDate = event.birthDate;
        this._address = event.address;
        this._membershipFees = [event.initialFee];
        this._status = MemberStatus.Active;
    }

}