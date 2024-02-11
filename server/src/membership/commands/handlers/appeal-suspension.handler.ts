import { MemberRepository } from 'src/membership/repository/member.repository';
import { AppealSuspensionCommand } from '../impl/appeal-suspension.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(AppealSuspensionCommand)
export class AppealSuspensionHandler
  implements ICommandHandler<AppealSuspensionCommand>
{
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AppealSuspensionCommand) {
    const member = this.eventPublisher.mergeObjectContext(
      await this.repository.get(command.memberId),
    );

    member.appealSuspension(command.date, command.reason);
    await this.repository.save(member);
    member.commit();
  }
}
