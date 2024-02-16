import { ICommand } from '@nestjs/cqrs';
import { MemberId } from 'src/membership/domain/model/member-id';

export class AppealMemberExpulsionCommand implements ICommand {
  constructor(
    public readonly id: MemberId,
    public readonly expulsionId: string,
    public readonly appealDate: Date,
    public readonly justification: string,
  ) {}
}
