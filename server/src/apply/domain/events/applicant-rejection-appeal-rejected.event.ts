import { DomainEvent } from "src/core/domain";

export class ApplicantRejectionAppealRejected  implements DomainEvent{
    constructor(
        public readonly id: string,
        public readonly date: Date,
        public readonly decision: string
    ){}
    
}