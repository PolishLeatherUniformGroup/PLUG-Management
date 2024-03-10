import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppealMembershipSuspensionCommand } from '../command/appeal-membership-suspension.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(AppealMembershipSuspensionCommand)
export class AppealMembershipSuspensionHandler
  implements ICommandHandler<AppealMembershipSuspensionCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: AppealMembershipSuspensionCommand) {
    const member = await this.members.getById(Member, command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.appealSuspension(
      command.suspensionId,
      command.appealDate,
      command.justification,
    );
    member.commit();
  }
}
