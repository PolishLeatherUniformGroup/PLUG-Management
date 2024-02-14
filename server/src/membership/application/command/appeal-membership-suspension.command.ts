import { ICommand } from '@nestjs/cqrs';
import { MemberId } from 'src/membership/domain/model/member-id';

export class AppealMembershipSuspensionCommand implements ICommand {
  constructor(
    public readonly id: MemberId,
    public readonly suspensionId: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
