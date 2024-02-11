import { ICommand } from '@nestjs/cqrs';

export class ApproveSuspensionAppealCommand implements ICommand {
  constructor(
    public readonly memberId: string,
    public readonly reason: string,
    public readonly date: Date,
  ) {}
}
