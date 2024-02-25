import { DomainEvent } from '../../../core/domain/models/domain-event';

export class ApplicationNotRecommended implements DomainEvent {
  public constructor(public readonly id: string) {}
}
