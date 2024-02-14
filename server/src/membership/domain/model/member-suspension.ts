export class MemberSuspension{
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
}

