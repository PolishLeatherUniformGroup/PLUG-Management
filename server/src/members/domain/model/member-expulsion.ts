
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
}
