import { ICommand } from '@nestjs/cqrs';
import { MemberId } from '../../domain/model/member-id';

export class MakeMemberHonoraryCommand implements ICommand {
  constructor(public readonly id: MemberId) {}
}
