import { AggregateRoot } from "src/core/domain";
import { Address } from "src/shared/address";
import { MemberId } from "./member-id";
import { MembershipFee } from "./membership-fee";
import { MemberStatus } from "./member-status";
import { MemberCreated } from "../events/member-created.event";
import { MemberCard } from "./member-card";
import { MemberCardAssigned } from "../events/member-card-assigned";

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
    private _memberCard?: MemberCard;

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

    public assignCardNumber(cardNumber: MemberCard){
       this.apply(new MemberCardAssigned(this._memberId.value, cardNumber));
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

    private onMemberCardAssigned(event: MemberCardAssigned){
        this._memberCard = event.cardNumber;
    }

}