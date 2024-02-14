import { MemberId } from "./member-id";

export class MemberSuspension {
    
    private _id: string;
    private _suspensionDate: Date;
    private _reason: string;
    private _susensionEndDate: Date;

    private _appealDeadline: Date;
    private _appealDate?: Date;
    private _appealJustification?: string;
    private _appealDecision?: string;
    private _appealDecisionDate?: Date;
    private _appealSuccessful?: boolean;

    constructor() {
    }

    public static create(id: string, suspensionDate: Date, reason: string, suspensionEndDate: Date, appealDeadline: Date): MemberSuspension {
        const suspension = new MemberSuspension();
        suspension._id = id;
        suspension._suspensionDate = suspensionDate;
        suspension._reason = reason;
        suspension._susensionEndDate = suspensionEndDate;
        suspension._appealDeadline = appealDeadline;
        return suspension;
    }

    public get id(): string {
        return this._id;
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
}

