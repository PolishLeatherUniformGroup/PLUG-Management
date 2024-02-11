import { EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SuspendMemberCommand } from '../impl/supsend-member.command';
import { MemberRepository } from 'src/membership/repository/member.repository';

export class SuspendMemberHandler
  implements ICommandHandler<SuspendMemberCommand>
{
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventBus: EventPublisher,
  ) {}

  async execute(command: SuspendMemberCommand) {
    const member = this.eventBus.mergeObjectContext(
      await this.repository.get(command.memberId),
    );
    member.suspend(
      command.suspensionDate,
      command.suspendUntil,
      command.suspensionReason,
      new Date(),
    );
    await this.repository.save(member);
    member.commit();
  }
}
