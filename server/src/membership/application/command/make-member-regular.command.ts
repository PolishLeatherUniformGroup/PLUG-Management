import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';

export class MakeMemberRegularCommand implements ICommand {
  constructor(public readonly id: MemberId) {}
}
