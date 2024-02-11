import { ICommand } from '@nestjs/cqrs';

export class AppealExpellCommand implements ICommand {
  constructor(
    public readonly memberId: string,
    public readonly date: Date,
    public readonly reason: string,
  ) {}
}
