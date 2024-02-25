import { ICommand } from '@nestjs/cqrs';
import { MemberCard } from 'src/membership/domain/model/member-card';
import { MemberId } from '../../domain/model/member-id';

export class AssignCardNumberCommand implements ICommand {
  constructor(
    public readonly id: MemberId,
    public readonly card: MemberCard,
  ) {}
}
