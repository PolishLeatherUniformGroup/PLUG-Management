import { ICommand } from '@nestjs/cqrs';

export class ExpireMembershipCommand implements ICommand {
  constructor(
    public readonly memberId: string,
    public readonly date: Date,
  ) {}
}
