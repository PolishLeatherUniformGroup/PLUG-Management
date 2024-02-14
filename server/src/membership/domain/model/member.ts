import { AggregateRoot } from "src/core/domain";
import { Address } from "src/shared/address";
import { MemberId } from "./member-id";
import { MembershipFee } from "./membership-fee";
import { MemberStatus } from "./member-status";
import { MemberCreated } from "../events/member-created.event";
import { MemberCard } from "./member-card";
import { MemberCardAssigned } from "../events/member-card-assigned.event";
import { Money } from "src/shared/money";
import { MembershipFeeRequested } from "../events";
import { MembershipFeePaid } from "../events/membership-fee-paid.event";
import { MemberType } from "./member-type";
import { MemberTypeChanged } from "../events/member-type-changed.event";
import { MemberSuspension } from "./member-suspension";
import { MemberExpulsion } from "./member-expulsion";
import { MembershipExpired } from "../events/membership-expired.event";
import { MembershipCancelled } from "../events/membership-cancelled.event";
import { MemberSuspended } from "../events/member-suspended.event";

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
    private _memberType: MemberType;
    private _memberSuspensions: MemberSuspension[]=[];
    private _memberExpulsions: MemberExpulsion[]=[];
    private _expireDate?: Date;
    private _cancelDate?: Date;

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

    public requestMembershipFeePayment(year:number, amount:Money, dueDate:Date){ 
        this.apply(new MembershipFeeRequested(this._memberId.value, year, amount, dueDate));
        
    }

    public registerPaymentForMembershipFee(feeId:string, amount:Money, paidDate:Date){
        this.apply(new MembershipFeePaid(this._memberId.value, feeId, amount, paidDate))
    }

    public makeRegularMember(){
        this.apply(new MemberTypeChanged(this._memberId.value, MemberType.Regular));
    }

    public makeHonoraryMember(){
        this.apply(new MemberTypeChanged(this._memberId.value, MemberType.Honorary));
    }

    public expireMembership(date:Date){
        this.apply(new MembershipExpired(this._memberId.value, date));
    }

    public cancelMembership(date:Date){
        this.apply(new MembershipCancelled(this._memberId.value, date));
    }

    public suspendMember(date:Date, reason:string, until:Date, appealDeadline:Date){
        const suspensionId = `${this._memberId.value}-sus-${this._memberSuspensions.length}`;
        this.apply(new MemberSuspended(this._memberId.value, suspensionId, date, reason, until,appealDeadline ));
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
        this._memberType = MemberType.Regular;
    }

    private onMemberCardAssigned(event: MemberCardAssigned){
        this._memberCard = event.cardNumber;
    }

    private onMembershipFeeRequested(event: MembershipFeeRequested){
        const membershipFee = MembershipFee.create(this._memberId, event.year, event.amount, event.dueDate);
        this._membershipFees.push(membershipFee);
    }

    private onMembershipFeePaid(event: MembershipFeePaid){
        const fee = this._membershipFees.find(fee => fee.id === event.feeId);
        if(fee){
            fee.pay(event.amount, event.paidDate);
        }
    }

    private onMemberTypeChanged(event: MemberTypeChanged){
        this._memberType = event.type;
    }

    private onMembershipExpired(event: MembershipExpired){
        this._expireDate = event.date;
        this._status = MemberStatus.Expired;
    }

    private onMembershipCancelled(event: MembershipCancelled){
        this._status = MemberStatus.Cancelled;
        this._cancelDate = event.date;
    }

    private onMemberSuspended(event: MemberSuspended){
        const suspension = MemberSuspension.create(event.suspensionId, event.date, event.reason, event.suspensionEndDate,event.appealDeadline);
        this._memberSuspensions.push(suspension);
    }

}