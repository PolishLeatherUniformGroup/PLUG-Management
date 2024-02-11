import { ICommand } from '@nestjs/cqrs';

export class SuspendMemberCommand implements ICommand {
  constructor(
    public readonly memberId: string,
    public readonly suspensionDate: Date,
    public readonly suspensionReason: string,
    public readonly suspendUntil: Date,
  ) {}
}
