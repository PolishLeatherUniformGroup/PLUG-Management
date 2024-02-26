import { DomainEvent } from '../../../core/domain';

export class MemberSuspensionEnded implements DomainEvent {
  public constructor(public readonly id: string) {}
}
