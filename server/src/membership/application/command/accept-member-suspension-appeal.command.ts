import { ICommand } from '@nestjs/cqrs';
import { MemberId } from 'src/membership/domain/model/member-id';

export class AcceptMemberSuspensionAppealCommand implements ICommand {
  constructor(
    public readonly memberId: MemberId,
    public readonly suspensionId: string,
    public readonly date: Date,
    public readonly reason: string,
  ) {}
}
