import { DomainEvent } from "../../../core/domain";

export class MembershipFeeAdded implements DomainEvent {
    constructor(
      public readonly id: string,
      public readonly year: number,
      public readonly amount: { amount: number; currency: string },
      public readonly dueDate: Date,
    ) {}
  }