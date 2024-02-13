import { DomainEvent } from "src/core/domain";

export class ApplicantRecommendationRefused implements DomainEvent {
    public constructor(
        public readonly id: string,
        public readonly recommendationId: string
    ) { }
}