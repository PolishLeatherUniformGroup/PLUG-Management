import { AggregateRoot } from "../../../core/domain";
import { Address } from "../../../shared/address";
import { Money } from "../../../shared/money";
import { MemberCreated, MemberCardAssigned, MembershipFeeRequested, MembershipFeePaid, MemberTypeChanged, MembershipExpired, MembershipCancelled, MemberSuspended, MembershipSuspensionAppealed, MembershipSuspensionAppealCancelled, MembershipSuspensionAppealAccepted, MembershipSuspensionAppealRejected, MemberSuspensionEnded, MemberExpelled, MemberExpulsionAppealed, MemberExpulsionAppealCancelled, MemberExpulsionAppealAccepted, MemberExpulsionAppealRejected } from "../events";
import { MemberCard } from "./member-card";
import { MemberExpulsion } from "./member-expulsion";
import { MemberId } from "./member-id";
import { MemberStatus } from "./member-status";
import { MemberSuspension } from "./member-suspension";
import { MemberType } from "./member-type";
import { MembershipFee } from "./membership-fee";


export class Member extends AggregateRoot {
  private _memberId: MemberId;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phoneNumber: string;
  private _joinDate: Date;
  private _birthDate: Date;
  private _address: Address;
  private _membershipFees: MembershipFee[];
  private _status: MemberStatus;
  private _memberCard?: MemberCard;
  private _memberType: MemberType;
  private _memberSuspensions: MemberSuspension[] = [];
  private _memberExpulsions: MemberExpulsion[] = [];
  private _expireDate?: Date;
  private _cancelDate?: Date;

  constructor() {
    super();
  }

  public aggregateId(): string {
    return this._memberId.value;
  }

  public static add(
    memberId: MemberId,
    card: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    joinDate: Date,
    birthDate: Date,
    address: Address,
    initialFee: MembershipFee,
  ): Member {
    const member = new Member();
    member.apply(
      new MemberCreated(
        memberId.value,
        firstName,
        lastName,
        email,
        phoneNumber,
        joinDate,
        birthDate,
        address,
        initialFee,
        false,
        card,
      ),
    );
    return member;
  }

  public static create(
    memberId: MemberId,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    joinDate: Date,
    birthDate: Date,
    address: Address,
    initialFee: MembershipFee,
  ): Member {
    const member = new Member();
    member.apply(
      new MemberCreated(
        memberId.value,
        firstName,
        lastName,
        email,
        phoneNumber,
        joinDate,
        birthDate,
        address,
        initialFee,
        true,
      ),
    );
    return member;
  }

  public assignCardNumber(cardNumber: MemberCard) {
    this.apply(new MemberCardAssigned(this._memberId.value, cardNumber));
  }

  public requestMembershipFeePayment(
    year: number,
    amount: Money,
    dueDate: Date,
  ) {
    this.apply(
      new MembershipFeeRequested(this._memberId.value, year, amount, dueDate),
    );
  }

  public registerPaymentForMembershipFee(
    feeId: string,
    amount: Money,
    paidDate: Date,
  ) {
    this.apply(
      new MembershipFeePaid(this._memberId.value, feeId, amount, paidDate),
    );
  }

  public makeRegularMember() {
    this.apply(new MemberTypeChanged(this._memberId.value, MemberType.Regular));
  }

  public makeHonoraryMember() {
    this.apply(
      new MemberTypeChanged(this._memberId.value, MemberType.Honorary),
    );
  }

  public expireMembership(date: Date) {
    this.apply(new MembershipExpired(this._memberId.value, date));
  }

  public cancelMembership(date: Date) {
    this.apply(new MembershipCancelled(this._memberId.value, date));
  }

  public suspendMember(
    date: Date,
    reason: string,
    until: Date,
    appealDeadline: Date,
  ) {
    const suspensionId = `${this._memberId.value}-sus-${this._memberSuspensions.length}`;
    this.apply(
      new MemberSuspended(
        this._memberId.value,
        suspensionId,
        date,
        reason,
        until,
        appealDeadline,
      ),
    );
  }

  public appealSuspension(
    suspensionId: string,
    appealDate: Date,
    justification: string,
  ) {
    this.apply(
      new MembershipSuspensionAppealed(
        this._memberId.value,
        suspensionId,
        appealDate,
        justification,
      ),
    );
    if (
      !this._memberSuspensions
        .find((suspension) => suspension.id !== suspensionId)
        ?.canBeAppealed(appealDate)
    ) {
      this.apply(
        new MembershipSuspensionAppealCancelled(
          this._memberId.value,
          suspensionId,
        ),
      );
    }
  }

  public acceptSuspensionAppeal(
    suspensionId: string,
    decisionDate: Date,
    reason: string,
  ) {
    this.apply(
      new MembershipSuspensionAppealAccepted(
        this._memberId.value,
        suspensionId,
        decisionDate,
        reason,
      ),
    );
  }

  public rejectSuspensionAppeal(
    suspensionId: string,
    decisionDate: Date,
    reason: string,
  ) {
    this.apply(
      new MembershipSuspensionAppealRejected(
        this._memberId.value,
        suspensionId,
        decisionDate,
        reason,
      ),
    );
  }

  public endSuspension() {
    this.apply(new MemberSuspensionEnded(this._memberId.value));
  }

  public expelMember(date: Date, reason: string, appealDeadline: Date) {
    const expulsionId = `${this._memberId.value}-exp-${this._memberExpulsions.length}`;
    this.apply(
      new MemberExpelled(
        this._memberId.value,
        expulsionId,
        date,
        reason,
        appealDeadline,
      ),
    );
  }

  public appealExpulsion(
    expulsionId: string,
    appealDate: Date,
    justification: string,
  ) {
    this.apply(
      new MemberExpulsionAppealed(
        this._memberId.value,
        expulsionId,
        appealDate,
        justification,
      ),
    );
    if (
      !this._memberExpulsions
        .find((expulsion) => expulsion.id !== expulsionId)
        ?.canBeAppealed(appealDate)
    ) {
      this.apply(
        new MemberExpulsionAppealCancelled(this._memberId.value, expulsionId),
      );
    }
  }

  public acceptExpulsionAppeal(
    expulsionId: string,
    decisionDate: Date,
    reason: string,
  ) {
    this.apply(
      new MemberExpulsionAppealAccepted(
        this._memberId.value,
        expulsionId,
        decisionDate,
        reason,
      ),
    );
  }

  public rejectExpulsionAppeal(
    expulsionId: string,
    decisionDate: Date,
    reason: string,
  ) {
    this.apply(
      new MemberExpulsionAppealRejected(
        this._memberId.value,
        expulsionId,
        decisionDate,
        reason,
      ),
    );
  }

  private onMemberCreated(event: MemberCreated) {
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
    if (!event.notify && event.card) {
      this._memberCard = MemberCard.create('PLUG', event.card);
    }
  }

  private onMemberCardAssigned(event: MemberCardAssigned) {
    this._memberCard = event.cardNumber;
  }

  private onMembershipFeeRequested(event: MembershipFeeRequested) {
    const membershipFee = MembershipFee.create(
      this._memberId,
      event.year,
      event.amount,
      event.dueDate,
    );
    this._membershipFees.push(membershipFee);
  }

  private onMembershipFeePaid(event: MembershipFeePaid) {
    const fee = this._membershipFees.find((fee) => fee.id === event.feeId);
    if (fee) {
      fee.pay(event.amount, event.paidDate);
    }
  }

  private onMemberTypeChanged(event: MemberTypeChanged) {
    this._memberType = event.type;
  }

  private onMembershipExpired(event: MembershipExpired) {
    this._expireDate = event.date;
    this._status = MemberStatus.Expired;
  }

  private onMembershipCancelled(event: MembershipCancelled) {
    this._status = MemberStatus.Cancelled;
    this._cancelDate = event.date;
  }

  private onMemberSuspended(event: MemberSuspended) {
    const suspension = MemberSuspension.create(
      event.suspensionId,
      event.date,
      event.reason,
      event.suspensionEndDate,
      event.appealDeadline,
    );
    this._memberSuspensions.push(suspension);
  }

  private onMemberSuspensionAppealed(event: MembershipSuspensionAppealed) {
    const suspension = this._memberSuspensions.find(
      (suspension) => suspension.id === event.suspensionId,
    );
    if (suspension) {
      suspension.appeal(event.date, event.justification);
    }
  }

  private onMemberSuspensionAppealCancelled(
    event: MembershipSuspensionAppealCancelled,
  ) {
    const suspension = this._memberSuspensions.find(
      (suspension) => suspension.id === event.suspensionId,
    );
    if (suspension) {
      suspension.cancelAppeal();
    }
  }

  private onMembershipSuspensionAppealAccepted(
    event: MembershipSuspensionAppealAccepted,
  ) {
    const suspension = this._memberSuspensions.find(
      (suspension) => suspension.id === event.suspensionId,
    );
    if (suspension) {
      suspension.acceptAppeal(event.date, event.reason);
    }
    this._status = MemberStatus.Active;
  }

  private onMembershipSuspensionAppealRejected(
    event: MembershipSuspensionAppealRejected,
  ) {
    const suspension = this._memberSuspensions.find(
      (suspension) => suspension.id === event.suspensionId,
    );
    if (suspension) {
      suspension.rejectAppeal(event.date, event.reason);
    }
  }

  private onMemberSuspensionEnded(event: MemberSuspensionEnded) {
    console.log(event);
    this._status = MemberStatus.Active;
  }

  private onMemberExpelled(event: MemberExpelled) {
    const expulsion = MemberExpulsion.create(
      event.expulsionId,
      event.date,
      event.reason,
      event.appealDeadline,
    );
    this._memberExpulsions.push(expulsion);
    this._status = MemberStatus.Expelled;
  }

  private onMemberExpulsionAppealed(event: MemberExpulsionAppealed) {
    const expulsion = this._memberExpulsions.find(
      (expulsion) => expulsion.id === event.expulsionId,
    );
    if (expulsion) {
      expulsion.appeal(event.date, event.justification);
    }
  }

  private onMemberExpulsionAppealCancelled(
    event: MemberExpulsionAppealCancelled,
  ) {
    const expulsion = this._memberExpulsions.find(
      (expulsion) => expulsion.id === event.expulsionId,
    );
    if (expulsion) {
      expulsion.cancelAppeal();
      this._status = MemberStatus.Deleted;
    }
  }

  private onMemberExpulsionAppealAccepted(
    event: MemberExpulsionAppealAccepted,
  ) {
    const expulsion = this._memberExpulsions.find(
      (expulsion) => expulsion.id === event.expulsionId,
    );
    if (expulsion) {
      expulsion.acceptAppeal(event.date, event.decision);
      this._status = MemberStatus.Active;
    }
  }

  private onMemberExpulsionAppealRejected(
    event: MemberExpulsionAppealRejected,
  ) {
    const expulsion = this._memberExpulsions.find(
      (expulsion) => expulsion.id === event.expulsionId,
    );
    if (expulsion) {
      expulsion.rejectAppeal(event.date, event.decision);
    }
  }
}
