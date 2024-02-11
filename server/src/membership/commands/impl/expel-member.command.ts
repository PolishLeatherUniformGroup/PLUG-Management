import { ICommand } from '@nestjs/cqrs';

export class ExpellMemberCommand implements ICommand {
  constructor(
    public readonly memberId: string,
    public readonly expellDate: Date,
    public readonly expellReason: string,
  ) {}
}
