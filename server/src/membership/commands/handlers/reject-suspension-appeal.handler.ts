import {
  CommandHandler,
  EventPublisher,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RejectSuspensionAppealCommand } from '../impl/reject-suspension-appeal.command';
import { MemberRepository } from 'src/membership/repository/member.repository';

@CommandHandler(RejectSuspensionAppealCommand)
export class RejectSuspensionAppealHandler
  implements ICommandHandler<RejectSuspensionAppealCommand>
{
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RejectSuspensionAppealCommand) {
    const member = this.eventPublisher.mergeObjectContext(
      await this.repository.get(command.memberId),
    );

    member.rejectSuspensionAppeal(command.date, command.reason);
    await this.repository.save(member);
    member.commit();
  }
}
