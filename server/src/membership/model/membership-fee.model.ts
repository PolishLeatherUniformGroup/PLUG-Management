import { Money } from "src/models/money.model";

export class MembershipFee{
    private _id:string;
    private _year:number;
    private _dueAmount:Money;
    private _dueDate:Date;
    private _paidAmount?:Money;
    private _paidDate?:Date;

    constructor(id:string, year:number, dueAmount:Money, dueDate:Date){
        this._id = id;
        this._year = year;
        this._dueAmount = dueAmount;
        this._dueDate = dueDate;
    }

    public pay(amount:Money, date:Date){
        this._paidAmount = amount;
        this._paidDate = date;
    }

    public isPaid():boolean {
        return this._paidAmount != undefined && this._paidDate != undefined && this._paidAmount.eq(this._dueAmount);
        
    }

    public get id():string{
        return this._id;
    }
    
}