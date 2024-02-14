import { ICommand } from '@nestjs/cqrs';
import { MemberId } from 'src/membership/domain/model/member-id';

export class RejectMemberExpulsionAppealCommand implements ICommand {
  constructor(
    public readonly memberId: MemberId,
    public readonly expulsionId: string,
    public readonly date: Date,
    public readonly reason: string,
  ) {}
}
