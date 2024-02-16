import { ICommand } from '@nestjs/cqrs';
import { MemberId } from 'src/membership/domain/model/member-id';

export class EndMemberSuspensionCommand implements ICommand {
  constructor(public readonly memberId: MemberId) {}
}
