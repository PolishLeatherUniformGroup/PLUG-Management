
export class MemberExpulsion {
    private _id: string;
    private _expulsionDate: Date;
    private _reason: string;

    private _appealDeadline: Date;
    private _appealDate?: Date;
    private _appealJustification?: string;
    private _appealDecision?: string;
    private _appealDecisionDate?: Date;
    private _appealSuccessful?: boolean;

    constructor(){}

    public get id(): string {
        return this._id;
    }

    public static create(id: string, expulsionDate: Date, reason: string, appealDeadline: Date): MemberExpulsion {
        const expulsion = new MemberExpulsion();
        expulsion._id = id;
        expulsion._expulsionDate = expulsionDate;
        expulsion._reason = reason;
        expulsion._appealDeadline = appealDeadline;
        return expulsion;
    }

    public canBeAppealed(date: Date): boolean {
        return date <= this._appealDeadline;
    }

    public cancelAppeal() {
        this._appealSuccessful = false;
    }
    public appeal(appealDate: any, justification: string) {
        this._appealDate = appealDate;
        this._appealJustification = justification;
    }
    public acceptAppeal(decisionDate: Date, reason: string) {
        this._appealDecision = reason;
        this._appealDecisionDate = decisionDate;
        this._appealSuccessful = true;
    }
    public rejectAppeal(date: Date, reason: string) {
        this._appealDecision = reason;
        this._appealDecisionDate = date;
        this._appealSuccessful = false;
    }
}
