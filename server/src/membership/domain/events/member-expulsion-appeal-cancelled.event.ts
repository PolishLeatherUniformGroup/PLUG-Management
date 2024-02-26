import { DomainEvent } from '../../../core/domain';

export class MemberExpulsionAppealCancelled implements DomainEvent {
  constructor(
    public id: string,
    public expulsionId: string,
  ) {}
}
