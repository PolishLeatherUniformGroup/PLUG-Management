import { DomainEvent } from "src/core/domain";

export class ApplicationRecommended implements DomainEvent {
    public constructor(
        public readonly id: string
    ) { }
}