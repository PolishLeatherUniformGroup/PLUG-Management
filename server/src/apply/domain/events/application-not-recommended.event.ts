import { DomainEvent } from 'src/core/domain';

export class ApplicationNotRecommended implements DomainEvent {
  public constructor(public readonly id: string) {}
}
