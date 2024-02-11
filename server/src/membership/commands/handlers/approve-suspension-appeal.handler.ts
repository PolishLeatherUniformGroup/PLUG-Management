import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MemberRepository } from 'src/membership/repository/member.repository';
import { ApproveSuspensionAppealCommand } from '../impl/approve-suspension-appeal.command';

@CommandHandler(ApproveSuspensionAppealCommand)
export class ApproveSuspsensionAppealHandler
  implements ICommandHandler<ApproveSuspensionAppealCommand>
{
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: ApproveSuspensionAppealCommand) {
    const member = this.eventPublisher.mergeObjectContext(
      await this.repository.get(command.memberId),
    );

    member.approveSuspensionAppeal(command.date, command.reason);
    await this.repository.save(member);
    member.commit();
  }
}
