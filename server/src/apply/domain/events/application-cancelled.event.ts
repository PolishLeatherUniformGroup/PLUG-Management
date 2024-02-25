import { DomainEvent } from "../../../core/domain";


export class ApplicationCancelled implements DomainEvent {
  public constructor(public readonly id: string) {}
}
