import { DomainEvent } from "../../../core/domain";
import { MemberCard } from '../model/member-card';

export class MemberCardAssigned implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly cardNumber: MemberCard,
  ) {}
}
