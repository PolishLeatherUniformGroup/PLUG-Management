import { DomainEvent } from "src/core/domain";

export class ApplicantRecommended implements DomainEvent {
    public constructor(
        public readonly id: string
    ) { }
}