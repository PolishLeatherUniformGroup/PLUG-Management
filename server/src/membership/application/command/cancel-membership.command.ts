import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';

export class CancelMembershipCommand implements ICommand {
  constructor(
    public readonly id: MemberId,
    public readonly date: Date,
  ) {}
}
