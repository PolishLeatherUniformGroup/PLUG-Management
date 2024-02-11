export class ExpellData{
    private _id:string;
    private _date:Date;
    private _reason:string;

    private _appealDate?: Date;
    private _appealReason?: string;
    private _appealDecisionDate?: Date;
    private _appealDecision?: string;

    constructor(
        id:string,
        date:Date,
        reason:string
    ){
        this._id =id;
        this._date = date;
        this._reason = reason;
    }
}