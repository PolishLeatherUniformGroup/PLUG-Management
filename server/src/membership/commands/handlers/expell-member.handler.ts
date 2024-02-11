import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MemberRepository } from 'src/membership/repository/member.repository';
import { ExpellMemberCommand } from '../impl/expel-member.command';

@CommandHandler(ExpellMemberCommand)
export class SuspendMemberHandler
  implements ICommandHandler<ExpellMemberCommand>
{
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventBus: EventPublisher,
  ) {}

  async execute(command: ExpellMemberCommand) {
    const member = this.eventBus.mergeObjectContext(
      await this.repository.get(command.memberId),
    );
    member.expell(command.expellDate, command.expellReason, new Date());
    await this.repository.save(member);
    member.commit();
  }
}
