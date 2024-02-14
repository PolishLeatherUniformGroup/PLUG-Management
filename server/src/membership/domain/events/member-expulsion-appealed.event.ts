import { DomainEvent } from 'src/core/domain';

export class MemberExpulsionAppealed implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly expulsionId: string,
    public readonly date: Date,
    public readonly justification: string,
  ) {}
}
