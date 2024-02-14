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
}