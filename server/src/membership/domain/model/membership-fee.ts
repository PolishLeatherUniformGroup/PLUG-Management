import { Money } from "src/shared/money";
import { MemberId } from "./member-id";

export class MembershipFee {
    
    private _id: string;
    private _year:number;
    private _dueAmount: Money;
    private _dueDate: Date;
    private _paidAmount?: Money;
    private _paidDate?: Date;

    public static initialFeeForMember(memberId:MemberId, dueAmount:Money, paidAmount:Money, paidDate:Date): MembershipFee {
        const fee = new MembershipFee();
        fee._id = `${memberId.value}-${new Date().getFullYear()}`;
        fee._year = new Date().getFullYear();
        fee._dueAmount = dueAmount;
        fee._dueDate = paidDate;
        fee._paidAmount = paidAmount;
        fee._paidDate = paidDate;
        return fee;
    }

    public static create(memberId:MemberId, year:number, dueAmount:Money, dueDate:Date): MembershipFee {
        const fee = new MembershipFee();
        fee._id = `${memberId.value}-${year}`;
        fee._year = year;
        fee._dueAmount = dueAmount;
        fee._dueDate = dueDate;
        return fee;
    }


    public get id(): string {
        return this._id;
    }

    public get year(): number {
        return this._year;
    }

    public get dueAmount(): Money {
        return this._dueAmount;
    }

    public get dueDate(): Date {
        return this._dueDate;
    }

    public get paidAmount(): Money | undefined{
        return this._paidAmount;
    }

    public get paidDate(): Date | undefined {
        return this._paidDate;
    }

    public pay(amount: Money, paidDate: Date) {
        this._paidAmount = amount;
        this._paidDate = paidDate;
    }
}