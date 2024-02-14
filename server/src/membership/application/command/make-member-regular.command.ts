import { ICommand } from '@nestjs/cqrs';
import { MemberId } from 'src/membership/domain/model/member-id';

export class MakeMemberRegularCommand implements ICommand {
  constructor(public readonly id: MemberId) {}
}
