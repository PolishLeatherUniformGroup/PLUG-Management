export class SuspensionData {
    private _id: string;
    private _date: Date;
    private _suspendedUntil:Date;
    private _reason: string;
    private _appealDeadline:Date;

    private _appealDate?: Date;
    private _appealReason?: string;
    private _appealDecisionDate?: Date;
    private _appealDecision?: string;

    constructor(
        id: string,
        date: Date,
        suspendedUntil:Date,
        reason: string,
        appealDeadline:Date,
    ) {
        this._id = id;
        this._date = date;
        this._suspendedUntil =suspendedUntil;
        this._reason = reason;
    }

    public appeal(date: Date, reason: string) {
        this._appealDate = date;
        this._appealReason = reason;
    }

    public approveAppeal(date: Date, reason: string) {
        this._appealDecisionDate = date;
        this._appealDecision = reason;
    }

    public rejectAppeal(date: Date, reason: string) {
        this._appealDecisionDate = date;
        this._appealDecision = reason;
    }

}