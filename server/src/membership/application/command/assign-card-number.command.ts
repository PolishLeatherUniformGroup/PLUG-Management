import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';
import { MemberCard } from '../../domain/model/member-card';

export class AssignCardNumberCommand implements ICommand {
  constructor(
    public readonly id: MemberId,
    public readonly card: MemberCard,
  ) {}
}
