import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';

export class ExpireMembershipCommand implements ICommand {
  constructor(
    public readonly id: MemberId,
    public readonly date: Date,
  ) {}
}
