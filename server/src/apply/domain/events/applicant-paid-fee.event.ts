import { DomainEvent } from "src/core/domain";
import { Money } from "src/shared/money";

export class ApplicantPaidFee implements DomainEvent {
    public constructor(
        public readonly id: string,
        public readonly paidDate: Date,
        public readonly amount: Money
    ) { }
}