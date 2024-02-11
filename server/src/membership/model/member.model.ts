import { AggregateRoot } from '@nestjs/cqrs';
import { Address } from 'src/models/address.model';
import { MembershipFee } from './membership-fee.model';
import { MemberStatus } from './member-status.enum';
import { MembershipType } from './membership-type.enum';
import { SuspensionData } from './suspension-data.model';
import { ExpellData } from './expell-data.model';
import { Money } from 'src/models/money.model';

export class Member extends AggregateRoot {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phone: string;
  private _address: Address;
  private _birthDate: Date;
  private _joinDate: Date;
  private _membershipFees: MembershipFee[];
  private _status: MemberStatus;
  private _membershipType: MembershipType;

  private _suspensionHistory: SuspensionData[];
  private _expellHistory: ExpellData[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate: Date,
    address: Address,
    joinDate: Date,
    paidFee: Money,
    paidFeeDate: Date,
  ) {
    super();
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._birthDate = birthDate;
    this._address = address;
    this._joinDate = joinDate;
    this._status = MemberStatus.Active;
    this._membershipType = MembershipType.Regular;
    const fee = new MembershipFee(
      `${id}_f0`,
      joinDate.getFullYear(),
      paidFee,
      paidFeeDate,
    );
    this._membershipFees = [...this._membershipFees, fee];
  }

  public requestMembershipFee(
    year: number,
    dueDate: Date,
    dueAmount: Money,
  ): string {
    if (this._status !== MemberStatus.Active) {
    }

    const feeId = `${this._id}_f${this._membershipFees.length}`;
    const fee = new MembershipFee(feeId, year, dueAmount, dueDate);
    this._membershipFees = [...this._membershipFees, fee];
    return feeId;
  }

  public registerMembershipFeePayment(
    feeId: string,
    paidAmount: Money,
    paidDate: Date,
  ) {
    this._membershipFees
      .filter((fee) => fee.id === feeId)[0]
      .pay(paidAmount, paidDate);
  }

  public suspend(
    date: Date,
    suspendedUntil: Date,
    reason: string,
    appealDeadline: Date,
  ): string {
    if (this._status !== MemberStatus.Suspended) {
    }
    const suspensionId = `${this._id}_s${this._membershipFees.length}`;
    const suspension = new SuspensionData(
      suspensionId,
      date,
      suspendedUntil,
      reason,
      appealDeadline,
    );
    this._suspensionHistory = [...this._suspensionHistory, suspension];
    this._status = MemberStatus.Suspended;
    return suspensionId;
  }

  public appealSuspension(date: Date, reason: string) {
    this._suspensionHistory.splice(-1)[0].appeal(date, reason);
  }

  public unSuspend(date: Date) {
    this._suspensionHistory.splice(-1)[0].finishSupsension(date);
    this._status = MemberStatus.Active;
  }

  public approveSuspensionAppeal(date: Date, reason: string) {
    this._suspensionHistory.splice(-1)[0].approveAppeal(date, reason);
    this._status = MemberStatus.Active;
  }

  public rejectSuspensionAppeal(date: Date, reason: string) {
    this._suspensionHistory.splice(-1)[0].approveAppeal(date, reason);
  }

  public expell(date: Date, reason: string, appealDeadline: Date): string {
    if (this._status !== MemberStatus.Expelled) {
    }
    const expellId = `${this._id}_e${this._membershipFees.length}`;
    const expell = new ExpellData(expellId, date, reason, appealDeadline);
    this._expellHistory = [...this._expellHistory, expell];
    this._status = MemberStatus.Expelled;
    return expellId;
  }

  public appealExpell(date: Date, reason: string) {
    this._expellHistory.splice(-1)[0].appeal(date, reason);
  }

  public approveExpellAppeal(date: Date, reason: string) {
    this._expellHistory.splice(-1)[0].approveAppeal(date, reason);
    this._status = MemberStatus.Active;
  }

  public rejectExpellAppeal(date: Date, reason: string) {
    this._expellHistory.splice(-1)[0].rejectAppeal(date, reason);
    this._status = MemberStatus.Removed;
  }

  public expireMembership(date: Date) {
    this._status = MemberStatus.Expired;
  }

  public cancelMembership(date: Date) {
    this._status = MemberStatus.Cancelled;
  }
}
