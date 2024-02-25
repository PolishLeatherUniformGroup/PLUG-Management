import { DomainEvent } from '../../../core/domain/models/domain-event';

export class ApplicantRecommended implements DomainEvent {
  public constructor(public readonly id: string) {}
}
