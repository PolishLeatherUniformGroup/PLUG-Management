import { DomainEvent } from '../../../core/domain';

export class MembershipSuspensionAppealCancelled implements DomainEvent {
  constructor(
    public id: string,
    public suspensionId: string,
  ) {}
}
