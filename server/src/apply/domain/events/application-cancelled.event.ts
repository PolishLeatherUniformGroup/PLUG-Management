import { DomainEvent } from 'src/core/domain';

export class ApplicationCancelled implements DomainEvent {
  public constructor(public readonly id: string) { }
}
