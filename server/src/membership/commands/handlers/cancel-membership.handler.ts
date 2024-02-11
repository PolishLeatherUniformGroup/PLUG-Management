import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { MemberRepository } from 'src/membership/repository/member.repository';
import { CancelMembershipCommand } from '../impl/cancel-membership.command';

@CommandHandler(CancelMembershipCommand)
export class CancelMembershipHandler
  implements ICommandHandler<CancelMembershipCommand>
{
  constructor(
    private readonly repository: MemberRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: CancelMembershipCommand): Promise<any> {
    const member = this.eventPublisher.mergeObjectContext(
      await this.repository.get(command.memberId),
    );
    member.cancelMembership(command.date);
    await this.repository.save(member);
    member.commit();
  }
}
