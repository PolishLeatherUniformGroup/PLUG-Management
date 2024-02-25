import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';

export class EndMemberSuspensionCommand implements ICommand {
  constructor(public readonly memberId: MemberId) {}
}
