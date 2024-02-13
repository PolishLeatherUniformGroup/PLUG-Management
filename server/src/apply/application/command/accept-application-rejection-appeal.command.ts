import { ICommand } from "@nestjs/cqrs";
import { ApplicantId } from "src/apply/domain/model";

export class AcceptApplicationRejectionAppealCommand implements ICommand{
    constructor(
        public readonly id: ApplicantId,
        public readonly decision: string,
        public readonly decisionDate: Date,
    ) {}
}