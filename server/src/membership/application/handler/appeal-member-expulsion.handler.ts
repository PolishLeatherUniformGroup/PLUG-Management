import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppealMemberExpulsionCommand } from '../command/appeal-member-expulsion.command';
import { StoreEventPublisher } from '../../../eventstore/store-event-publisher';
import { Member } from '../../domain/model/member';
import { MemberAggregateRepository } from '../../infrastructure/repository/member-aggregate-repository';

@CommandHandler(AppealMemberExpulsionCommand)
export class AppealMemberExpulsionHandler
  implements ICommandHandler<AppealMemberExpulsionCommand>
{
  constructor(
    private readonly members: MemberAggregateRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: AppealMemberExpulsionCommand) {
    const member = await this.members.getById(Member, command.id.value);
    if (!member) {
      throw new Error('Member not found');
    }
    member.appealExpulsion(
      command.expulsionId,
      command.appealDate,
      command.justification,
    );
    member.commit();
  }
}
