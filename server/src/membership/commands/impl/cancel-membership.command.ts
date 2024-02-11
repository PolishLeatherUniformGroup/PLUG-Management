import { ICommand } from '@nestjs/cqrs';

export class CancelMembershipCommand implements ICommand {
  constructor(
    public readonly memberId: string,
    public readonly date: Date,
  ) {}
}
